json.partial! "api/stories/story", story: @story
json.author @story.author, :id, :username, :profile_pic_url
json.responses do
  @responses.each do |story|
    json.set! story.id do
      json.partial! "api/stories/story", story: story
      json.extract! story
      json.author @authors[story.author_id], :id, :username, :profile_pic_url
    end
  end
end
