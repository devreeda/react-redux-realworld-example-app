import React from "react";
import { Link } from "react-router-dom";
import agent from "../agent";
import { connect } from "react-redux";
import {
  ARTICLE_FAVORITED,
  ARTICLE_UNFAVORITED
} from "../constants/actionTypes";

const FAVORITED_CLASS = "btn btn-sm btn-primary";
const NOT_FAVORITED_CLASS = "btn btn-sm btn-outline-primary";

const mapDispatchToProps = dispatch => ({
  favorite: slug =>
    dispatch({
      type: ARTICLE_FAVORITED,
      payload: agent.Articles.favorite(slug)
    }),
  unfavorite: slug =>
    dispatch({
      type: ARTICLE_UNFAVORITED,
      payload: agent.Articles.unfavorite(slug)
    })
});

const FilmPreview = React.memo(props => {
  /*const article = props.article;
  const favoriteButtonClass = article.favorited
    ? FAVORITED_CLASS
    : NOT_FAVORITED_CLASS;

  const handleClick = ev => {
    ev.preventDefault();
    if (article.favorited) {
      props.unfavorite(article.slug);
    } else {
      props.favorite(article.slug);
    }
  };
*/

  const { title, overview } = props.movie;
  return (
    <div className="article-preview">
      <Link to={`/article`} className="preview-link">
        {/** UN ARTICLE DE LA LISTE */}
        <h1>{title}</h1>
        <p>{overview}</p>
        <span>Read more...</span>
      </Link>
    </div>
  );
});

export default connect(() => ({}), mapDispatchToProps)(FilmPreview);
