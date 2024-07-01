class ModelUser {
  constructor(username, email, password) {
    this.primaryKey = Math.random();
    this.username = username;
    this.email = email;
    this.password = password;
  }
}

class ModelAd {
  constructor(
    title,
    description,
    category,
    status,
    price,
    urlPhoto,
    address,
    referenceKeyUser,
    phone
  ) {
    this.primaryKey = Math.random();
    this.referenceKeyUser = referenceKeyUser;
    this.createdAt = new Date();
    this.title = title;
    this.description = description;
    this.category = category;
    this.status = status;
    this.price = price;
    this.urlPhoto = urlPhoto;
    this.address = address;
    this.referenceKeyUserPurchased = "";
    this.phone = phone;
    this.lead = [];
  }
}
class ModelReview {
  constructor(referenceKeyUser, title, description, rating, referenceKeyAd) {
    this.primaryKey = Math.random();
    this.referenceKeyUser = referenceKeyUser;
    this.title = title;
    this.description = description;
    this.rating = rating;
    this.date = new Date();
    this.referenceKeyAd = referenceKeyAd;
  }
}

class ModelAuth {
  constructor(referenceKeyUser) {
    this.primaryKey = Math.random();
    this.token = Math.random();
    this.referenceKeyUser = referenceKeyUser;
  }
}

class ModelReport {
  constructor(referenceKeyUser, referenceKeyAd, description, status) {
    this.primaryKey = Math.random();
    this.referenceKeyAd = referenceKeyAd;
    this.referenceKeyUser = referenceKeyUser;
    this.description = description;
    this.status = status;
  }
}

class ModelFavourite {
  constructor(referenceKeyUser, referenceKeyAd) {
    this.primaryKey = Math.random();
    this.referenceKeyUser = referenceKeyUser;
    this.referenceKeyAd = referenceKeyAd;
  }
}

module.exports = {
  ModelUser,
  ModelAd,
  ModelReview,
  ModelAuth,
  ModelReport,
  ModelFavourite,
};
