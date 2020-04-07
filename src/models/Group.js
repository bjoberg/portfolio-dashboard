export default class Group {
  constructor({
    id,
    thumbnailUrl,
    imageUrl,
    title,
    description,
    images,
  }) {
    this.id = id;
    this.thumbnailUrl = thumbnailUrl;
    this.imageUrl = imageUrl;
    this.title = title;
    this.description = description;
    this.images = images;
  }
}
