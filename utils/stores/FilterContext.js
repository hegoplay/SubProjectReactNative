import { createContext, useReducer, useState } from "react";
import { getUsersPending } from "../../connection/UserConnection";

export const FilterContext = createContext({
    data:{
        gender:[],
        minAge: 0,
        maxAge:0,
        maxDistance: 0,
        languages: []
    },
    users: [],
    setGender: (genders) =>{},
    setMinAge: (age) =>{},
    setMaxAge: (age) =>{},
    setMaxDistance: (distance) => {},
    setLanguages: (languages) =>{},
    getPendingUsers: async () => {},
})

const typeList = {
    gender: "Gender",
    minAge: "MinAge",
    maxAge: "MaxAge",
    maxDistance: "MaxDistance",
    languages: "Languages"
}

const reducer = (state, action) => {
    switch (action.type) {
        case typeList.gender:
            return { ...state, gender: action.payload };
        case typeList.minAge:
            return { ...state, minAge: action.payload };
        case typeList.maxAge:
            return { ...state, maxAge: action.payload };
        case typeList.maxDistance:
            return { ...state, maxDistance: action.payload };
        case typeList.languages:
            return { ...state, languages: action.payload };
        default:
            return state; // Return current state if action type is unknown
    }
};

export const FilterProvider = ({children})=>{

    const [filter, dispatch] = useReducer(reducer,{
        gender: ["Female"],
        minAge: 18,
        maxAge: 80,
        maxDistance: 10,
        languages: [],
    });

    const [users, setUsers] = useState([]);

    const getPendingUsers = async (filter) => {
        const users = await getUsersPending(filter);
        setUsers(users);
    }

    const setGender = (genders) =>{
        dispatch({type: typeList.gender, payload: genders});
    }
    const setMinAge = (age) =>{
        dispatch({type: typeList.minAge, payload: age});
    }
    const setMaxAge = (age) =>{
        dispatch({type: typeList.maxAge, payload: age});
    }
    const setMaxDistance = (distance) =>{
        dispatch({type: typeList.maxDistance, payload: distance});
    }
    const setLanguages = (languages) =>{
        dispatch({type: typeList.gender, payload: languages});
    }


    return <FilterContext.Provider value={{
        data: filter,
        users,
        setGender,
        setMinAge,
        setMaxAge,
        setMaxDistance,
        setLanguages,
        getPendingUsers,
    }}>
        {children}
    </FilterContext.Provider>
}
