class Marketplace {
    users = []
    ads = []
    reviews = []
    auth = []
    reports = []
    favourites = []

register (email, password){ 
    //salvare i dati inseriti e inserirli nell'array "users"//
}

login (username, password){
    //verificare se i dati esistono nell'array users, se esistono reindirizzare alla pagina successiva e inserire nell'array "auth" (che a sua volta creerà un token), altrimenti dare un "errore"
}

logout(token){
    // verificare se c'è l'username nella lista "auth" e rimuovere il codice univoco (token)
}

// createAd(referenceKeyUser , token, title, description, category, status, price, urlPhoto, address, sold, phone??????){
    //attraverso il token si verifica se l'utente è loggato e poi attraverso il modelad inserisce l'ad all'array ads
}

modifyAd(referenceKeyAd, referenceKeyUser, token){
    //dato l'id del Ad creato dall'utente, solo lo stesso che lo ha creato può accedervi (attraverso il token), verificare se è presente all'interno dell'array ads e modificarlo
}

deleteAd(referenceKeyAd, referenceKeyUser, token){
    //dato l'id del Ad creato dall'utente, verifica se l'utente è lo stesso che lo ha creato (attraverso il token) e lo elimina
}

createReview(referenceKeyUser, token, referenceKeyAd ){ 
    //verificare se l'utente è loggato, l'utente potrà utilizzare il ModelReview per inserire una recensione. aggiungere la recensione all'array reviews
}

modifyReview(token, primaryKeyReview, referenceKeyUser){
    //verificare se l'utente che vuole modificare la recensione è lo stesso che l'ha creata, recuperare la recensione dall'array "reviews"
}

deleteReview(referenceKeyUser, primaryKeyReview, token){
    //verificare se l'user corrisponde al token,  recuperare la primaryKeyReview ed eliminarla
}

deleteAccount(referenceKeyUser, token){
    // verificare se l'user corrisponde al token, eliminare l'account
}

modifyUsername(referenceKeyUser, token){
    //se l'user corrisponde al token, username dell'array user può essere cambiato
}

putSold(token, referenceKeyUser, referenceKeyAd){
    // recuperare l'ad, verificare token.., verificare se "sold" è falso e in quel caso impostarlo a true (faccio il map su "ads", trova l'id di Ad e modifica la chiave sold in true)

}

filterList(price, category, status, sold){}

selectSoldProduct(referenceKeyAd, referenceKeyUser, token){}

selectBoughtProduct(referenceKeyAd, referenceKeyUser, token){}

createFavouriteList(referenceKeyAd, referenceKeyUser, token){}

addFavourite(referenceKeyUser, referenceKeyAd){}

removeFavourite(referenceKeyAd, referenceKeyUser){}

searchAd(){}







    
}

class ModelUser {
    constructor(username, email, password) 
    {this.primaryKey = Math.random()
        this.username = username;
        this.email = email;
        this.password = password
    }
    
}

class ModelAd { 
    constructor(title, description, category, status, price, urlPhoto, address, sold, phone ) {
        this.primaryKey = Math.random()
        this.referenceKeyUser = referenceKeyUser
        this.createdAt = new Date();
        this.title = title;
        this.description = description
        this.category = category 
        this.status = status 
        this.price = price 
        this.urlPhoto = urlPhoto 
        this.address = address
        this.sold = false
        this.phone = phone
    }
}
    class ModelReview { 
        constructor(referenceKeyUser, title, description, rating, date, referenceKeyAd)  
        {
            this.primaryKey = Math.random()
            this.referenceKeyUser = referenceKeyUser
            this.title = title
            this.description = description
            this.rating = rating
            this.date = date
            this.referenceKeyAd = referenceKeyAd

        } }

        class ModelAuth { 
            constructor(referenceKeyUser)
            { 
                this.primaryKey = Math.random()
                this.tokenKey = Math.random()
                this.referenceKeyUser = referenceKeyUser
            }
        }
        
class ModelReport { 
    constructor(referenceKeyUser, referenceKeyAd, description, status)

    {
        this.primaryKey = Math.random()
        this.referenceKeyAd = referenceKeyAd
        this.referenceKeyUser = referenceKeyUser
        this.description = description 
        this.status = status
    }
}

class ModelFavourite {
    constructor(referenceKeyUser, referenceKeyAd)
    {
        this.primaryKey = Math.random()
        this.referenceKeyUser = referenceKeyUser
        this.referenceKeyAd = referenceKeyAd
    }
}