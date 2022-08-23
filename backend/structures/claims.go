package structures

import "github.com/dgrijalva/jwt-go"

type Claims struct {
	Username string
	Role     *bool
	UID      string
	jwt.StandardClaims
}

var jwtKey = []byte("secretkey")

func GetKey() []byte {
	return jwtKey
}
