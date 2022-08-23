package control

import (
	"api/structures"
	users "api/user/control"
	uview "api/user/view"
	userbook "api/userbook/control"
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"

	"github.com/google/uuid"
	"github.com/gorilla/mux"

	"github.com/jinzhu/gorm"
)

var globaldb *gorm.DB

func PassDB(db *gorm.DB) {
	globaldb = db
	users.PassDB(db)
	userbook.PassDB(db)
	uview.PassDB(db)

}

func New(w http.ResponseWriter, r *http.Request) {
	var NewBook structures.Book
	err := json.NewDecoder(r.Body).Decode(&NewBook)
	fmt.Println("errorr is:", err)
	uid := uuid.New()
	NewBook.BId = uid.String()
	fmt.Println(NewBook)
	globaldb.Debug().Transaction(func(tx *gorm.DB) error {
		fmt.Println("Test after fetching order: ", NewBook)
		if err := tx.Create(&NewBook).Error; err != nil {
			fmt.Println(err)
			return err
		}
		return nil
	})
}

func GetAll(w http.ResponseWriter, r *http.Request) {
	var AllNewBook []structures.Book
	globaldb.Debug().Find(&AllNewBook)
	fmt.Println(len(AllNewBook))
	for i := 0; i < len(AllNewBook); i++ {
		if AllNewBook[i].DeletedAt == nil {
			fmt.Println(AllNewBook[i], AllNewBook[i].CreatedAt)
		}
	}
	json.NewEncoder(w).Encode(AllNewBook)
	w.WriteHeader(200)
}
func Update(w http.ResponseWriter, r *http.Request) {

	var params = mux.Vars(r)
	var book, update structures.Book

	var bookid = params["bookid"]
	fmt.Println(bookid)
	err := json.NewDecoder(r.Body).Decode(&update)
	fmt.Println("update book recieved struct:", update)
	if err != nil {
		fmt.Println("error occured", err)
	}
	globaldb.Debug().Where("id = ?", bookid).First(&book)
	u64, _ := strconv.ParseUint(bookid, 10, 32)
	if book.ID != uint(u64) {
		fmt.Println("Product Not found")
		w.WriteHeader(404)
		fmt.Fprintf(w, "%s Not Found", bookid)
		return
	} else {

		if update.Name != "" {
			globaldb.Debug().Model(book).Where("id = ?", bookid).Update("name", update.Name)
		}
		if update.Author != "" {
			globaldb.Debug().Model(book).Where("id = ?", bookid).Update("author", update.Author)
		}
		if update.Quantity != 0 {
			globaldb.Debug().Model(book).Where("id = ?", bookid).Update("quantity", update.Quantity)
		}

		w.WriteHeader(201)
	}
}
func Delete(w http.ResponseWriter, r *http.Request) {
	fmt.Println("sadfsfdg")
	var params = mux.Vars(r)
	var book structures.Book
	var bookid string = params["bookid"]
	fmt.Println("delete called", bookid)

	globaldb.Debug().Where("id = ?", bookid).First(&book)

	globaldb.Delete(&book)

	w.WriteHeader(200)
}
