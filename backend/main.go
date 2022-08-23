package main

import (
	book "api/books/control"
	"api/structures"
	user "api/user/control"
	uview "api/user/view"
	userbook "api/userbook/control"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/dgrijalva/jwt-go"
	_ "github.com/go-sql-driver/mysql"
	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	"github.com/jinzhu/gorm"

	_ "github.com/jinzhu/gorm/dialects/mysql"
)

var db *gorm.DB

func main() {
	var err error
	db, err = gorm.Open("mysql", "root:root@/library?charset=utf8&parseTime=True&loc=Local")
	if err != nil {
		fmt.Println(err)
	}

	fmt.Println("server start")
	// newuser := structures.NewUser("test123", "test", "123", "test", "dahanu", true, 1111111111, 0)
	// db.Create(&newuser)
	// fmt.Println("table created")
	// db.Debug().CreateTable(&structures.Book{})
	// db.Debug().Model(&structures.Books{}).AddForeignKey("custid", "customers(uid)", "RESTRICT", "RESTRICT")
	db.Debug().CreateTable(&structures.Book{})
	db.Debug().CreateTable(&structures.User{})
	db.Debug().Model(&structures.User{}).AddForeignKey("uid", "user(uid)", "RESTRICT", "RESTRICT")
	db.Debug().CreateTable(&structures.UserBooks{})
	db.Debug().Model(&structures.UserBooks{}).AddForeignKey("book_id", "book(bid)", "RESTRICT", "RESTRICT")

	book.PassDB(db)
	userbook.GetDues()
	handleReq()

}

func handleReq() {

	headersOk := handlers.AllowedHeaders([]string{
		"Content-Type", "X-Total-Count", "token",
	})
	originsOk := handlers.AllowedOrigins([]string{"*"})
	methodsOk := handlers.AllowedMethods([]string{"GET", "DELETE", "HEAD", "POST", "PUT", "OPTIONS"})
	router := mux.NewRouter().StrictSlash(true)
	router.HandleFunc("/", homePage).Methods("GET")
	router.HandleFunc("/loginpage", loginPage).Methods("POST")
	router.HandleFunc("/api/books/new", book.New).Methods("POST")
	router.HandleFunc("/api/books/display", book.GetAll).Methods("GET")
	router.HandleFunc("/api/books/update/{bookid}", book.Update).Methods("PUT")
	router.HandleFunc("/api/book/delete/{bookid}", book.Delete).Methods("DELETE")

	router.HandleFunc("/api/user/new", user.New).Methods("POST")
	router.HandleFunc("/api/user/display", user.GetAll).Methods("GET")
	router.HandleFunc("/api/user/update/{userid}", user.Update).Methods("PUT")
	router.HandleFunc("/api/user/delete/{userid}", user.Delete).Methods("DELETE")
	router.HandleFunc("/api/user/soleuser/{userid}", user.Soleuser).Methods("GET")

	router.HandleFunc("/api/userbook/new", userbook.New).Methods("POST")
	router.HandleFunc("/api/userbook/display/{userbookid}", userbook.GetAll).Methods("GET")
	router.HandleFunc("/api/userbook/delete/{id}", userbook.Delete).Methods("DELETE")

	server := http.Server{
		Addr:         "0.0.0.0:4008",
		ReadTimeout:  time.Second * 60,
		WriteTimeout: time.Second * 60,
		IdleTimeout:  time.Second * 60,
		Handler:      handlers.CORS(headersOk, methodsOk, originsOk)(router),
	}
	log.Fatal(server.ListenAndServe())
}

func homePage(w http.ResponseWriter, r *http.Request) {
	//refreshToken(w, r)
	cookie, err := r.Cookie("token")
	if err != nil {
		if err == http.ErrNoCookie {
			w.WriteHeader(http.StatusUnauthorized)
			return
		}
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	jwtKey := structures.GetKey()
	tokenStr := cookie.Value
	claims := &structures.Claims{}
	tkn, err := jwt.ParseWithClaims(tokenStr, claims, func(t *jwt.Token) (interface{}, error) {
		return jwtKey, nil
	})
	if err != nil {
		if err == jwt.ErrSignatureInvalid {
			w.WriteHeader(http.StatusUnauthorized)
			return
		}
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	if !tkn.Valid {
		w.WriteHeader(http.StatusUnauthorized)
		return
	}

	fmt.Fprintf(w, "Hello, %s", claims.Username)
}
func loginPage(w http.ResponseWriter, r *http.Request) {
	var userforlogin structures.User
	var password string
	err := json.NewDecoder(r.Body).Decode(&userforlogin)
	password = userforlogin.PassWord
	fmt.Println("Inside Login")
	fmt.Println(userforlogin)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	// if userforlogin.IsActive != "1" {
	// 	w.WriteHeader(http.StatusBadRequest)
	// 	return
	// }
	alluser := uview.GetAll()
	for _, u := range alluser {
		if u.UserName == userforlogin.UserName {
			userforlogin = u
			break
		}
	}
	fmt.Println(userforlogin)
	if password != userforlogin.PassWord {
		w.WriteHeader(http.StatusUnauthorized)
		return
	}

	expirationTime := time.Now().Add(time.Minute * 20)
	claims := &structures.Claims{
		Username: userforlogin.UserName,
		Role:     userforlogin.IsAdmin,
		UID:      userforlogin.Uid,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: expirationTime.Unix(),
		},
	}

	jwtKey := structures.GetKey()
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString(jwtKey)
	if err != nil {

		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	tokenvalue := tokenString
	http.SetCookie(w, &http.Cookie{
		Name:    "token",
		Value:   tokenString,
		Expires: expirationTime,
	})
	w.Header().Set("token", tokenvalue)
	// json.NewEncoder(w).Encode(userforlogin.IsAdmin)
	// fmt.Fprintf(w, "%s", tokenvalue)
	json.NewEncoder(w).Encode(tokenvalue)

}

// newuser := structures.NewUser("test123", "test", "123", "test", "dahanu", true, true, 1111111111, 0)
// router.HandleFunc("/update/{uname}/", control.UpdateUsers).Methods("POST")
// router.HandleFunc("/delete/{uname}", control.DeleteUser).Methods("POST")
// log.Fatal(http.ListenAndServe(":4008", handlers.CORS(originsOk, headersOk, methodsOk)(router)))
// }

// controller.Test(db)
// controller.CustomerDetails(db)

// db.Debug().CreateTable(&structure.Product{})
// db.Debug().CreateTable(&structure.Address{})

// db.Debug().Model(&structure.Address{}).AddForeignKey("custid", "customers(uid)", "RESTRICT", "RESTRICT")
// var user []structure.Orders
// db.Debug().Preload("orders").Find(&user)
// fmt.Println("User Print preload:", user)x
// for i := 0; i < len(user); i++ {
// 	fmt.Println("User Print preload:", user[i].Custid)
// }
// recipt.Printrecipt("Dnaik", db)
// db.Create(&newuser)
// db.Debug().CreateTable(&structures.Book{})
// db.Debug().Model(&structure.Address{}).AddForeignKey("custid", "customers(uid)", "RESTRICT", "RESTRICT")
// db.Debug().CreateTable(&structures.User{})
// db.Debug().Model(&structure.Address{}).AddForeignKey("custid", "customers(uid)", "RESTRICT", "RESTRICT")
