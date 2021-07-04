#!/bin/bash

# Start Go API
go run . &

# Start React
cd ./static && npm start

