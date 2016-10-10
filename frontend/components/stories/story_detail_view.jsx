import React from 'react';
import { Link } from 'react-router';
import StoryDetail from "./story_detail";


export default class StoryShow extends React.Component{

	constructor(props){
		super(props);

		const setCurrentStory = (data) => { console.log(data);};
		if(!window.currentStory){

			this.props.requestStory(this.props.params.storyId, setCurrentStory);
		}
	}

	componentWillUnmount(){

	}

	render(){
    const story = this.props.story;

		return(
      <div className="single-story-show">
         <div >
           <StoryDetail story={story} />
         </div>
      </div>
		);
	}
}
//
//
// const StoryShow = ({ story, storyId, requestStory, children }) => {
//
//   const stories = {
//     [story.id]: story
//   };
//
//   return(
//     <div className="single-story-show">
//       <div >
//         <StoryDetail story={story} />
//       </div>
//     </div>
//   );
// };

// export default StoryShow;
