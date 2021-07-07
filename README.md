# Ray Hear & Austin Gerner Advanced Software Paradigm Final Project - Golang

![Auth0 Go React](./golang-react-auth-artillery-docker-demo-landing-page.png)

Our application will show you how to build and secure a mock voting application. You'll create an API with Go and a frontend with React that will consume your API. You'll secure your API using Auth0 so that only authenticated users can access and vote on products.  Also, be able to build your API and frontend using your local but also create a container in Docker.  Then be able to test the load performance of the API using Artillery.

## Technology

Our demo uses:

- [Go v1.14](https://golang.org/)
- [React v16.13](https://reactjs.org/)
- [Auth0](https://auth0.com/)
- [Artillery](https://artillery.io/)
- [Docker](https://www.docker.com/)

Make sure you have [Go installed](https://golang.org/doc/install) before running the demo.

## Running the demo

**Clone and get dependencies**

* Clone the repo with `git clone https://github.com/agerner17/advanced_software_paradigms_golang_project`
* Switch to the directory that holds the repo `cd golang-react-auth-artillery-docker-demo`
* Run `go get` to grab the dependencies

**Auth0 Setup**

Next step is to create an Auth0 account at, [sign up](https://auth0.com/signup) for one now.

* Navigate to the Auth0 [management dashboard](https://manage.auth0.com/) and click on **Create Application**. Name your application anything you'd like, select "Single Page Web Applications", and click **Create**.
* Click on **Settings** and fill in **Allowed Callback URLs**, **Allowed Logout URLs**, and **Allowed Web Origins** with `http://localhost:3000` and then press **Save changes**.
* Back in your code, create a new file to store some of these variables:

```bash
touch static/src/auth_config.json
```

Then fill it in with:

```json
{
  "domain": "YOUR_DOMAIN",
  "clientId": "YOUR_CLIENT_ID"
}
```

Update this with your own credentials. You can find them in your Auth0 dashboard application page that you just created.

* Now set up the Go API with Auth0. In the dashboard, click on **APIs** in the sidebar and then click **Create API**.
* Give it any name you'd like. For identifier, this can be anything, but for naming conventions we recommend a URL format (doesn't have to be a real URL). Leave Signing Algorithm as is and click **Create**.
* Update your `main.go` file with the required values from the Auth0 dashboard. There are 3 different spots that need to be updated:

```go
// main.go
// ...
aud := "YOUR_API_IDENTIFIER"
// ...
iss := "https://YOUR_DOMAIN/"
// ...  
resp, err := http.Get("https://YOUR_DOMAIN/.well-known/jwks.json")
// ...
```

Your **Identifier** is listed on the Settings tab of the API you just created in the dashboard. To find `YOUR_DOMAIN`, click on the **Quick Start** tab and scroll down to the code snippet. Copy the value for `options.Authority` and use that to replace `YOUR_DOMAIN`. Make sure you keep the trailing slash for `iss` in `main.go`.

**Run React**

* To start the React front end create a new terminal tab and switch to the React directory and then pull in the required dependencies

```bash
cd static
npm install
```

* Start your React application

```bash
npm start
```

**Run Go**

* In a separate terminal tab, grab the dependencies

```bash
go get
```

* Build and run your Go application:

```bash
go run .
```
 
 Now you should be able to see your API on [`http://localhost:3000`](http://localhost:3000)
