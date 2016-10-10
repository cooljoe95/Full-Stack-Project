class Api::StoriesController < ApplicationController

  def index
    @stories = Story.where(response_id: nil).includes(:author);
    @authors = @stories.map{ |story| story.author_id }
    @authors = User.find(@authors)
    @authors = @authors.each_with_object({}) { |v,h| h[v.id] = v }
    render "api/stories/index"
  end


  def create
    @story = Story.create!(story_params)
    @responses = @story.responses.includes(:author)
    @authors = @responses.map{ |story| story.author_id }
    @authors = User.find(@authors)
    @authors = @authors.each_with_object({}) { |v,h| h[v.id] = v }
    debugger
    render "api/stories/show"
  end

  def show
    @story = Story.where(id: params[:id]).first
    @responses = @story.responses.includes(:author)
    @authors = @responses.map{ |story| story.author_id }
    @authors = User.find(@authors)
    @authors = @authors.each_with_object({}) { |v,h| h[v.id] = v }
    render "api/stories/show"
  end

  def story_params
    params.require(:story).permit(:response_id, :author, :original_post, :title, :body, :author_id)
  end

end
