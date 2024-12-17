const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      message: null,
      demo: [
        {
          title: "FIRST",
          background: "white",
          initial: "white",
        },
        {
          title: "SECOND",
          background: "white",
          initial: "white",
        },
      ],
      user: null,
      token: sessionStorage.getItem("token"),
      favs: [],
    },
    actions: {
      // Use getActions to call a function within a fuction

      // login: async (email, password) => {
      //   let response = await fetch(process.env.BACKEND_URL + "/login", {
      //     method: "POST",
      //     headers: { "Content-type": "application/json" },
      //     body: JSON.stringify({
      //       email: email,
      //       password: password,
      //     }),
      //   });
      //   let data = await response.json();
      //   sessionStorage.setItem("token", data.access_token);
      //   sessionStorage.setItem("user", data.user);
      // },
      login: async (email, password) => {
        let response = await fetch(process.env.BACKEND_URL + "/login", {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        });
        let data = await response.json();
      
        if (response.ok) {
          // Store the token and user in sessionStorage and Flux store
          sessionStorage.setItem("token", data.access_token);
          sessionStorage.setItem("user", JSON.stringify(data.user));
          
          setStore({
            token: data.access_token,
            user: data.user,
          });
        } else {
          throw new Error("Login failed");
        }
      },
      
      logout: () => {
        // Remove token from sessionStorage
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user"); // Clear any user data if necessary
      
        // Clear the store's token and user data
        setStore({ token: null, user: null });
      }, 

      updateUser: async (formData) => {
        let response = await fetch(process.env.BACKEND_URL + "/update_user", {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            height: formData.height,
            last_name: formData.last_name,
            name: formData.name,
            weight: formData.weight,
          }),
        });

        if (response.ok) {
          let data = await response.json();
          setStore({ user: data.updated_user }); // Update the global store with the new user data
        } else {
          console.error("Failed to update user:", response.status);
        }
      },

      getUser: async () => {
        let response = await fetch(process.env.BACKEND_URL + "/user", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          let data = await response.json();
          console.log(data);
          setStore({ user: data });
        } else {
          console.error("Failed to fetch user data:", response.status);
        }
      },

     
      addFavs: (fav, type) => {
        const store = getStore();
        setStore({ favs: [...store.favs, { ...fav, type }] });
      },
      
      removeFavs: (fav) => {
        const store = getStore();
        const newFavs = store.favs.filter(
          (favorite) =>
            favorite.idMeal !== fav.idMeal || favorite.type !== fav.type
        );
        setStore({ favs: newFavs });
      },

      getUserFavorites: async () => {
        try {
            const response = await fetch(process.env.BACKEND_URL + "/favorites", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                },
            });
    
            if (response.ok) {
                const data = await response.json();
                setStore({ favs: data }); // Store favorites in the state
            }
        } catch (error) {
            console.error("Failed to fetch favorites:", error);
        }
    }, 
    
      addFav: async (fav, type) => {
        try {
          const response = await fetch(process.env.BACKEND_URL + "/favorites", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
            body: JSON.stringify({ name: fav.name, type }),
          });
      
          if (response.ok) {
            const data = await response.json();
            const store = getStore();
            setStore({ favs: [...store.favs, data.favorite] });
          }
        } catch (error) {
          console.error("Failed to add favorite:", error);
        }
      },

      removeFav: async (favoriteId) => {
        try {
          const response = await fetch(
            `${process.env.BACKEND_URL}/favorites/${favoriteId}`,
            {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
              },
            }
          );
      
          if (response.ok) {
            const store = getStore();
            const newFavs = store.favs.filter((fav) => fav.id !== favoriteId);
            setStore({ favs: newFavs });
          }
        } catch (error) {
          console.error("Failed to delete favorite:", error);
        }
      },      




































      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },
      getMessage: async () => {
        try {
          // fetching data from the backend
          const resp = await fetch(process.env.BACKEND_URL + "/hello");
          const data = await resp.json();
          setStore({ message: data.message });
          // don't forget to return something, that is how the async resolves
          return data;
        } catch (error) {
          console.log("Error loading message from backend", error);
        }
      },
      changeColor: (index, color) => {
        //get the store
        const store = getStore();
        //we have to loop the entire demo array to look for the respective index
        //and change its color
        const demo = store.demo.map((elm, i) => {
          if (i === index) elm.background = color;
          return elm;
        });

        //reset the global store
        setStore({ demo: demo });
      },
    },
  };
};

export default getState;