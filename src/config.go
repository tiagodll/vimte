package main

import "os"

type Config struct {
	AppPort    string
	StaticPath string
	CodePath   string
}

func GetEnvConfig() Config {
	config := Config{
		AppPort:    os.Getenv("APP_PORT"),
		StaticPath: os.Getenv("STATIC_PATH"),
		CodePath:   os.Getenv("CODE_PATH"),
	}
	return config
}
