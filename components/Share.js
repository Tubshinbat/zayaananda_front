"use client";

export default ({ shareUrl = "a", title = "a" }) => {
  return (
    <>
      <ul className="share-box ">
        <li>
          <i className="fa fa-share-alt" />
        </li>
        <li>
          <a
            className="facebook"
            href={`http://www.facebook.com/share.php?u=${shareUrl}`}
            target="popup"
          >
            <i className="fa-brands fa-facebook-square" />
          </a>
        </li>
        <li>
          <a
            className="twitter"
            href={`https://twitter.com/intent/tweet?text=${title}&url=${shareUrl}`}
            target="popup"
          >
            <i className="fa-brands fa-twitter-square" />
          </a>
        </li>

        <li>
          <a
            className="linkedin"
            href={`http://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}`}
            target="popup"
          >
            <i className="fa-brands fa-linkedin" />
            <span />
          </a>
        </li>
      </ul>
    </>
  );
};
