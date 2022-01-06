class ArticleSerializer < ActiveModel::Serializer
  attributes :id, :title, :content, :minutes_to_read, :author, :date
end
