import { REQUEST_STORIES, REQUEST_STORY, CREATE_STORY, receiveStories, receiveStory, requestStories } from '../actions/story_actions';
import { fetchStories, fetchStory, createStory } from "../util/story_api_util";
import { hashHistory } from 'react-router';

const StoriesMiddleware = ({getState, dispatch}) => next => action => {

  switch (action.type) {
    case REQUEST_STORIES:
      const success = data => dispatch(receiveStories(data));
      fetchStories(success);
      return next(action);
    case REQUEST_STORY:
      fetchStory(action.id, (data) => dispatch(receiveStory(data)));
      return next(action);
    case CREATE_STORY:
      createStory(action.story, (data) => { dispatch(receiveStory(data)); hashHistory.push(`/stories/${data.id}`); });
      return next(action);
    default:
      return next(action);
  }
};

export default StoriesMiddleware;
