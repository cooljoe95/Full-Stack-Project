import React from 'react';
import AuthorInfoItem from './author_info_item';
import { hashHistory } from 'react-router';

class StoryIndexItem extends React.Component{
  constructor(props){
    super(props);
    this.story = props.story;
    this.handleClick = this.handleClick.bind(this);
    this.handleLike = this.handleLike.bind(this);
  }

  handleClick() {
    const storyId = this.story.id;
    hashHistory.push( "stories/" + storyId);
  }

  handleLike(e) {
    const like_id = window.currentUser.id;
    const story_id = this.props.story.id;
    // $.ajax({
    //   method:
    // });
    const numLikes = document.getElementsByClassName(`num-likes-${this.story.id}`)[0];
    if(this.story.likers[window.currentUser.id] === undefined){
      e.currentTarget.innerHTML = "Liked";
      const resultLink = parseInt(numLikes.innerHTML) + 1;
      numLikes.innerHTML = resultLink;
      this.story.likers[like_id] = {like: true};
      $.ajax({
        method: "POST",
        url: "api/likes",
        dataType: "json",
        data: {like_relationship: {author_id: like_id, story_id}}
      });
    } else {
      e.currentTarget.innerHTML = "Not Yet Liked";
      const resultLink = parseInt(numLikes.innerHTML) - 1;
      numLikes.innerHTML = resultLink;
      const people = this.props.story.likers;
      delete people[like_id];
      $.ajax({
        method: "DELETE",
        url: "api/likes/0",
        dataType: "json",
        data: {delete_me: {author_id: like_id, story_id}}
      });
    }
  }



  render(){
    let firstParagraph = this.story.body.split(/\n/)[0];
    if(firstParagraph.split("<p>")[0] === ""){
      firstParagraph = firstParagraph.slice(3, firstParagraph.length-4);
    }
    firstParagraph = firstParagraph.concat("...");

    const buttonText = () => {
      if (!window.currentUser || this.story.author.id === window.currentUser.id){
        return;
      }
      if(this.story.likers === undefined){
        this.story.likers = {};
      }
      return <button onClick={this.handleLike}>{this.story.likers[window.currentUser.id] === undefined ? "Not Yet Liked" : "Liked"}</button>;
    };
    return (
      <div className="individual-story">
        <AuthorInfoItem author={this.story.author} key={`author-of-${this.story.id}`} size="40" />
        <li className="original-story-index-view" style={{ cursor: "pointer" }} onClick={this.handleClick} >
          <h1>{this.story.title}</h1>
          <p dangerouslySetInnerHTML={{__html: firstParagraph}}></p>
        </li>
        {buttonText()}<span className={`num-likes-${this.story.id}`}>{this.story.likers ? Object.keys(this.story.likers).length : 0}</span>
        Num Comments
      </div>
    );
  }
}

export default StoryIndexItem;
