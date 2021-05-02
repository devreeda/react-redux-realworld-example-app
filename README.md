# PROJET WE

> Auteur : Rida GHOUTI TERKI

## Introduction

Ce projet part de l'application Conduit, un clone open source de la plateforme Medium qui permet à ses utilisateurs d'écrire des articles sur divers sujets. J'ai choisi de partir de l'implémentation déjà existante [React + Redux](https://github.com/khaledosman/react-redux-realworld-example-app) qui comme son nom l'indique est l'équivalent React de l'application. Redux servira à partager les données au sein de l'application (elles sont accessibles peu importe la page où l'on se situe).

## Lancer le programme

Vous devez clone le projet dans le dossier de votre choix :

```
git clone https://github.com/devreeda/react-redux-realworld-example-app
```

Puis vous placer dans le dossier cloné :

```
cd react-redux-realworld-example-app
```

Pour lancer le programme tapez les commandes suivantes :

```
npm install
npm start
```

## Ajout de fonctionnalité

Mon apport à ce projet est l'ajout d'une liste de films, parallèlement à la liste d'articles préexistante. Pour cela j'ai fait appel à l'API [The Movie Database](https://www.themoviedb.org/?language=fr).

### Récupération des données

Pour récupérer les films, j'ai installé la librairie [axios](https://github.com/axios/axios) qui permet de fetch facilement les données à partir de l'url d'une API.

`axios.js`

```javascript=
import axios from "axios";

/** base url to make requests to the movie database */
const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3"
});

export default instance;
```

La constante "instance" servira de base pour nos appels API, il faudra ensuite préciser le type de film que l'on souhaite et l'ajouter dans l'url.
Les différents types de films se trouve dans le fichier `requests.js`

```javascript=
const API_KEY = "**************************";

const requests = {
  fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
  fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_networks=213`,
  fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
  fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
  fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
  fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
  fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`
};

export default requests;
```

### Ajout de la liste

Pour ajouter notre liste, il faut d'abord placer notre onglet qui permettra son accès en cliquant dessus. Pour cela, il faut se placer dans le fichier `MainView.js`.
Nous allons ajouter notre onglet cliquable qui lorsque l'on clique dessus permet d'activer un boolean qui affiche ou non la liste de film.
`MainView.js`

```jsx=
const MoviesFeedTab = React.memo(props => {
  const clickHandler = ev => {
    ev.preventDefault();
    props.onTabClick("movies", agent.Articles.all, agent.Articles.all());
    isMovieSelected = true;
  };
  return (
    <li className="nav-item">
      <button
        type="button"
        className={props.tab === "movies" ? "nav-link active" : "nav-link"}
        onClick={clickHandler}
      >
        Movies
      </button>
    </li>
  );
});
```

Ensuite, on affiche la bonne liste en fonction du boolean :
`MainView.js`

```jsx=
const returnList = props => {
  if (isMovieSelected) {
    return (
      <FilmList
        pager={props.pager}
        articles={props.articles}
        loading={props.loading}
        articlesCount={props.articlesCount}
        currentPage={props.currentPage}
      />
    );
  } else {
    return (
      <ArticleList
        pager={props.pager}
        articles={props.articles}
        loading={props.loading}
        articlesCount={props.articlesCount}
        currentPage={props.currentPage}
      />
    );
  }
};
```

### Contenu de la liste

Nous allons ici importer notre constante `requests` qui va nous permettre de fetch la liste de notre choix. Une fois la liste récupérer, nous allons afficher les films de cette liste à travers le composant `FilmPreview` et nous allons lui passer en props son film correspondant pour qu'il puisse afficher ses informations.

`FilmList.js`

```jsx=
const FilmList = React.memo(props => {
  const [movies, setMovies] = useState([]);

  // A snippet of code which runs based on a specific condition/variable
  useEffect(() => {
    // if [], run once when the row loads, and don't run again
    async function fetchData() {
      const request = await axios.get(requests.fetchTopRated);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [requests.fetchTopRated]);

  if (!props.articles) {
    return <div className="article-preview">Loading...</div>;
  }

  if (props.articles.length === 0) {
    return <div className="article-preview">No film are here... yet.</div>;
  }

  return (
    <div>
      {movies.map(movie => {
        return <FilmPreview movie={movie} key={movie.id} />;
      })}
    </div>
  );
});
```

### Affichage des items

Enfin, dans `FilmPreview.js`, nous affichons le film avec son affiche, son titre et sa description. Ces informations nous sont fournies par l'api TMDB.

`FilmPreview.js`

```jsx=
const { title, overview, backdrop_path } = props.movie;
console.log(props.movie);
return (
  <div className="article-preview">
    {/** UN ARTICLE DE LA LISTE */}
    <img
      src={`${base_url}${backdrop_path}`}
      alt={title}
      style={{ width: 800 }}
    />
    <h1>{title}</h1>
    <p>{overview}</p>
  </div>
);
```
