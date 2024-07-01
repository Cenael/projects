const model = require("./model.js");
class Marketplace {
  users = [];
  ads = [];
  reviews = [];
  auth = [];
  reports = [];
  favourites = [];

  register(email, password) {
    const userFound = this.users.find(function (user) {
      if (user.email === email) return true;
      else return false;
    });
    if (!!userFound) {
      return console.log("User already exists");
    } else {
      const newUser = new ModelUser(email, password);
      this.users = [...this.users, newUser];
    }
  }

  login(username, password) {
    const authFound = this.users.find(function (user) {
      if (user.username === username && user.password === password) return true;
      else return false;
    });
    if (!authFound) return console.log("Invalid credentials");
    const token = new ModelAuth(authFound.referenceKeyUser);
    this.auth = [...this.auth, token];
  }

  logout(token) {
    const auth = this.getUserByToken(token);
    if (!auth) {
      console.log("Invalid Token");
    } else {
      this.auth = this.auth.filter(function (auth) {
        if (auth.token !== token) return true;
        else return false;
      });
      console.log("Succesfully logged out");
    }
  }

  getUserByToken(token) {
    const authFound = this.auth.find(function (auth) {
      if (auth.token === token) return true;
      else return false;
    });
    if (!authFound) return null;
    else return authFound;
  }
  createAd(
    token,
    title,
    description,
    category,
    status,
    price,
    urlPhoto,
    address,
    phone
  ) {
    const auth = this.getUserByToken(token);
    if (!auth) {
      console.log("Invalid Token");
      return;
    }
    const newAd = new ModelAd(
      title,
      description,
      category,
      status,
      price,
      urlPhoto,
      address,
      auth.referenceKeyUser,
      phone
    );
    this.ads = [...this.ads, newAd];
    console.log("Ad successfully created!");
  }

  updateAd(
    referenceKeyAd,
    token,
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
    const auth = this.getUserByToken(token);
    if (!auth) {
      console.log("Invalid Token");
      return;
    }
    const adFound = this.ads.find(function (ad) {
      if (ad.primaryKey === referenceKeyAd) return true;
      else return false;
    });
    if (!adFound) {
      console.log("Unfound Ad");
      return;
    }
    const updatedAd = this.ads.map((ad) => {
      if (ad.referenceKeyUser === auth.referenceKeyUser)
        return {
          ...ad,
          title: title,
          description: description,
          category: category,
          status: status,
          price: price,
          urlPhoto: urlPhoto,
          address: address,
          referenceKeyUser: referenceKeyUser,
          phone: phone,
        };

      return { ...ad };
    });
    this.ads = updatedAd;
  }

  //dato l'id del Ad creato dall'utente, solo lo stesso che lo ha creato può accedervi (attraverso il token), verificare se è presente all'interno dell'array ads e modificarlo

  deleteAd(referenceKeyAd, token) {
    const auth = this.getUserByToken(token);
    if (!auth) {
      console.log("Invalid Token");
      //dato l'id del Ad creato dall'utente, verifica se l'utente è lo stesso che lo ha creato (attraverso il token) e lo elimina
      return;
    }
    const adFound = this.ads.find(function (ad) {
      if (ad.primaryKey === referenceKeyAd) return true;
      else return false;
    });

    if (!adFound) {
      console.log("Unfound Ad");
      return;
    }
    this.ads = this.ads.filter(function (ad) {
      if (adFound.primaryKey !== ad.primaryKey) return true;
      else return false;
    });
    console.log("Succesfully removed Ad");
  }

  readPhoneNumber(token, referenceKeyAd) {
    const auth = this.getUserByToken(token);
    if (!auth) {
      console.log("Invalid Token");
      return;
    }
    const adFound = this.ads.find(function (ad) {
      if (ad.primaryKey === referenceKeyAd) return true;
      else return false;
    });

    if (!adFound) {
      console.log("Unfound Ad");
      return;
    }
    console.log(adFound.phone);
    adFound.lead = [...adFound.lead, auth];
  }

  readLeadsList(token, referenceKeyAd) {
    const auth = this.getUserByToken(token);
    if (!auth) {
      console.log("Invalid Token");
      return;
    }
    const adFound = this.ads.find((ad) => {
      if (ad.primaryKey === referenceKeyAd) return true;
      else return false;
    });

    adFound.lead;
  }

  createReview(
    referenceKeyUser,
    token,
    referenceKeyAd,
    title,
    description,
    rating
  ) {
    const auth = this.getUserByToken(token);
    if (!auth) {
      console.log("Invalid Token");
      return;
    }
    const newReview = new ModelReview(
      referenceKeyUser,
      title,
      referenceKeyAd,
      description,
      rating
    );
    this.reviews = [...this.ads, newReview];
    console.log("Review succesfully created!");
  }

  deleteReview(referenceKeyReview, token) {
    const auth = this.getUserByToken(token);
    if (!auth) {
      console.log("Invalid Token");
      return;
    }
    const reviewFound = this.reviews.find((review) => {
      if (review.primaryKey === referenceKeyReview) {
        return true;
      } else return false;
    });
    this.reviews = this.reviews.filter((review) => {
      if (reviewFound.primaryKey !== review.primaryKey) {
        return true;
      } else return false;
    });
    console.log("Succesfully Review Removed");
  }

  deleteAccount(referenceKeyUser, token) {
    const auth = this.getUserByToken(token);
    if (!auth) {
      console.log("Invalid Token");
      return;
    }
    const userFound = this.users.find((user) => {
      if (user.primaryKey === referenceKeyUser) {
        return true;
      } else return false;
    });
    this.users = this.users.filter((user) => {
      if (userFound.primaryKey !== user.primaryKey) {
        return true;
      } else return false;
    });
    console.log("Account succesfully deleted");
  }

  updateUsername(newUsername, token) {
    const auth = this.getUserByToken(token);
    if (!auth) {
      console.log("Invalid Token");
      return;
    }
    this.users = this.users.map((user) => {
      if (user.referenceKeyUser === auth.referenceKeyUser) {
        return { ...this.users, username: newUsername };
      }
    });
  }

  updateAdAsSold(token, referenceKeyAd, referenceKeyUserPurchased) {
    const authFound = this.getUserByToken(token);
    if (!authFound) {
      console.log("Invalid Token");
    } else {
      const adFound = this.ads.find(function (ad) {
        if (ad.primaryKey === referenceKeyAd) return true;
        else return false;
      });
      if (!adFound) console.log("Ad not found");
      else {
        if (adFound.referenceKeyUser !== authFound.referenceKeyUser) {
          console.log("Unknown User");
        }
        if (adFound.referenceKeyUserPurchased !== "")
          console.log("Ad already sold");
        else {
          this.ads = this.ads.map(function (ad) {
            if (adFound.primaryKey === ad.primaryKey) {
              return {
                ...ad,
                referenceKeyUserPurchased: referenceKeyUserPurchased,
              };
            } else return { ...ad };
          });
        }
      }
    }
  }

  readFilterList(price, category, status, sold) {
    const authFound = this.getUserByToken(token);
    if (!authFound) {
      console.log("Invalid Token");
    } else {
      const adFound = this.ads.find(function (ad) {
        if (ad.primaryKey === referenceKeyAd) return true;
        else return false;
      });
      if (!adFound) console.log("Ad not found");
      else {
        this.ads = this.ads.filter(function (ad) {
          if (
            (price === "" || ad.price === price) &&
            (category === "" || ad.category === category) &&
            (status === "" || ad.status === status) &&
            (sold === "" || ad.referenceKeyUserPurchased === sold)
          )
            return true;
          else return false;
        });
      }
      //filtra gli ads per categoria scritta nei parametri
    }
  }
  //alcuni cambi saranno delle stringhe ben precise

  readAdListByText(text) {
    //filtra in ads gli oggetti che contengono il testo inserito
  }

  createFavouriteAdList(referenceKeyAd, token) {
    const auth = this.getUserByToken(token);
    if (!auth) {
      console.log("Invalid Token");
      return;
    }
    const adFound = this.ads.find(function (ad) {
      if (ad.primaryKey === referenceKeyAd) return true;
      else return false;
    });
    if (!adFound) console.log("Ad not found");
    else {
      if (adFound.referenceKeyUserFavourite !== "")
        console.log("Ad already added to favourites");
      else {
        this.ads = this.ads.map(function (ad) {
          if (adFound.primaryKey === ad.primaryKey) {
            return {
              ...ad,
              referenceKeyUserFavourite: auth.referenceKeyUser,
            };
          } else return { ...ad };
        });
      }
    }
    //verificare se il token corrisponde all'utente
  }

  updateFavouriteAdList(referenceKeyAd, token) {
    const auth = this.getUserByToken(token);
    if (!auth) {
      console.log("Invalid Token");
      return;
    }
    const adFound = this.ads.find(function (ad) {
      if (ad.primaryKey === referenceKeyAd) return true;
      else return false;
    });
    if (!adFound) console.log("Ad not found");
    else {
      if (adFound.referenceKeyUserFavourite !== "")
        console.log("Ad already added to favourites");
      else {
        this.ads = this.ads.map(function (ad) {
          if (adFound.primaryKey === ad.primaryKey) {
            return {
              ...ad,
              referenceKeyUserFavourite: auth.referenceKeyUser,
            };
          } else return { ...ad };
        });
      }
    }
  }

  deleteFavouriteAd(referenceKeyAd, token) {
    const auth = this.getUserByToken(token);
    if (!auth) {
      console.log("Invalid Token");
      return;
    }
    const adFound = this.ads.find(function (ad) {
      if (ad.primaryKey === referenceKeyAd) return true;
      else return false;
    });
    if (!adFound) console.log("Ad not found");
    else {
      this.ads = this.ads.filter((ad) => {
        if (adFound.primaryKey !== ad.primaryKey) return true;
        else return false;
      });
      console.log("Succesfully removed Ad");
    }
  }
}
