package main



import (
  "encoding/json"
  "github.com/gorilla/mux"
  "net/http"
)
type Product struct {
  Id int
  Name string
  Slug string
  Description string
}

/* We will create our catalog of VR experiences and store them in a slice. */
var products = []Product{
Product{Id: 1, Name: "Java", Slug: "world-of-authcraft", Description : "Battle bugs and protect yourself from invaders while you explore a scary world with no security"},
Product{Id: 2, Name: "C++", Slug: "ocean-explorer", Description : "Explore the depths of the sea in this one of a kind underwater experience"},
Product{Id: 3, Name: "Python", Slug : "dinosaur-park", Description : "Go back 65 million years in the past and ride a T-Rex"},
Product{Id: 4, Name: "Rust", Slug : "cars-vr", Description: "Get behind the wheel of the fastest cars in the world."},
Product{Id: 5, Name: "Javascript", Slug: "robin-hood", Description : "Pick up the bow and arrow and master the art of archery"},
Product{Id: 6, Name: "GO", Slug: "real-world-vr", Description : "Explore the seven wonders of the world in VR"}}

func main() {
  // Here we are instantiating the gorilla/mux router
  r := mux.NewRouter()

  // On the default page we will simply serve our static index page.
  r.Handle("/", http.FileServer(http.Dir("./views/")))
  // We will setup our server so we can serve static assest like images, css from the /static/{file} route
    ////////
  // NEW CODE
  ////////
  // Our API is going to consist of three routes
  // /status - which we will call to make sure that our API is up and running
  // /products - which will retrieve a list of products that the user can leave feedback on
  // /products/{slug}/feedback - which will capture user feedback on products
  r.Handle("/status", StatusHandler).Methods("GET")
  r.Handle("/products", ProductsHandler).Methods("GET")
  r.Handle("/products/{slug}/feedback", AddFeedbackHandler).Methods("POST")


  r.PathPrefix("/static/").Handler(http.StripPrefix("/static/", http.FileServer(http.Dir("./static/"))))

  // Our application will run on port 8080. Here we declare the port and pass in our router.
  http.ListenAndServe(":8080", r)
}

var NotImplemented = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request){
  w.Write([]byte("Not Implemented"))
})

/* The status handler will be invoked when the user calls the /status route
   It will simply return a string with the message "API is up and running" */
   var StatusHandler = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request){
    w.Write([]byte("API is up and running"))
  })
  
  /* The products handler will be called when the user makes a GET request to the /products endpoint.
     This handler will return a list of products available for users to review */
  var ProductsHandler = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request){
    // Here we are converting the slice of products to JSON
    payload, _ := json.Marshal(products)
  
    w.Header().Set("Content-Type", "application/json")
    w.Write([]byte(payload))
  })

  /* The feedback handler will add either positive or negative feedback to the product
   We would normally save this data to the database - but for this demo, we'll fake it
   so that as long as the request is successful and we can match a product to our catalog of products we'll return an OK status. */
var AddFeedbackHandler = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request){
  var product Product
  vars := mux.Vars(r)
  slug := vars["slug"]

  for _, p := range products {
      if p.Slug == slug {
          product = p
      }
  }

  w.Header().Set("Content-Type", "application/json")
  if product.Slug != "" {
    payload, _ := json.Marshal(product)
    w.Write([]byte(payload))
  } else {
    http.Error(w, http.StatusText(http.StatusNotFound), http.StatusNotFound)
  }
})
