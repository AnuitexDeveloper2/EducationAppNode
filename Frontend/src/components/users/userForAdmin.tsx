import "./users.css";
import React, { useEffect, useState } from "react";
import  ReactTable  from "react-table-v6";
import Toggle from "react-toggle";
import  "../../shared/css/toggle.css";
import { SortType } from "../../shared/enums/sortType";
import { getUsers, blockUser } from "../../services/users";
import LastColumn from "../lastColumn/lastColumn";
import { UserModel } from "../../shared/models/user/user";
import Poligon  from "../../assets/Polygon.png";
import { UserFilterType } from "../../shared/enums/userFilterType";
import { UserFilter } from "../../shared/models/user/userFilter";
import SearchBar from "../searchBar/search";

const UsersForAdmin = () => {

    const [data,setData] = useState({
        users:[],
        pages:0,
        userType: UserFilterType.All
    })

    const [modal,setModal] = useState({
        showStatus: false,
        showSearch: false
    })
    const [user,setUser] = useState({
        item: {}})
    useEffect(()=>
        {getData(0,UserFilterType.All)},[]
    )

       const passData =(currentUser) => {
            setUser({item: currentUser})
        }

    const getData = async(pages,userType) => {
        
            const filter:UserFilter = {
                searchString: '',
                pageNumber: pages + 1,
                pageSize: 10,
                sortType: SortType.None,
                userType: userType
        }     
           const users = await getUsers(filter)
           setData({users: users.data,pages: Math.floor(users.count/10+1),userType:UserFilterType.All})
    }

    const changeStatus = async(id: string) => {
        const result =await blockUser(id)
        if (result) {
            getData(0,UserFilterType.All)
        }
    }

    const filterStatus = ()=> {
        setModal({
            showStatus:!modal.showStatus,
            showSearch:false
        })
    }

    const filterSearch =() =>{
        setModal({
            showStatus: false,
            showSearch:!modal.showSearch
        })
    }
    
    
    const columns =[
        {
            Header: "Login",
            accessor: "userName"
        },
        {
            Header:props => {
                return(<div>User Name<img src={Poligon} alt="" className="search-Drop-Down" onClick={filterSearch} />
                {/* {modal.showSearch&&<SearchBar params={setData} placeholder=""/>} */}
                </div>
                )
            },
            id:'firstName',
            accessor: (data: any) => {
                return(
                    <>
                  {<div>{data.firstName} {data.lastName}</div>}
                </>
                )
              }, 
        },
        {
            Header: "Email",
            accessor: "email"
        },
        {
        Header: props => {
            return(
            <div>
            <span>Status <img src={Poligon} alt="" onClick={filterStatus}/></span>
            <div>
            {modal.showStatus&&<PickStatus setData={setData} />}
            </div>

           
        </div>
        )},
            id: "status",
            accessor: (data:UserModel) =>
            { function some(){
                changeStatus(data.id)
            }
             return(<Toggle checked={data.status}  onClick={some}/>)}
        },
        {
            Header: "",
            Cell: props => {
                return(
                  <>
                <LastColumn value={user} assigment="user"/>
                </>
                )
            }
        }

    ]
    return(
     <div>
     <div className ="author-header">
        <div className="authors-title">
        Users Managment
        </div>
        <br/>
       
      </div>
        <ReactTable
        getTdProps={(rstate, rowInfo) => {
            return {
                onClick: () => {
                    if (rowInfo !== undefined) {
                        const currentUser ={
                            id:rowInfo.original.id,name:rowInfo.original.userName
                        }
                        passData(currentUser)
                    }
             }}}}
             className="-striped -highlight"
             columns={columns}
             data={data.users}
             defaultPageSize={10}
             manual
             sortable= {false}
             pages={data.pages}
             onFetchData={(state) =>{
                 getData(state.page,data.userType)
                }}
                />
                </div>
    )
}

const PickStatus = ({setData})  => {
    const selectStatus =async(e) => {
        debugger
        let idx;
        const type = e.target.value==="Active"? idx =UserFilterType.Blocked: idx = UserFilterType.Active
        const filter:UserFilter = {
            searchString: '',
            pageNumber: 1,
            pageSize: 10,
            sortType: SortType.None,
            userType: idx
    }     
       const users = await getUsers(filter)
       setData({users: users.data,pages: Math.floor(users.count/10+1),type})
    }
    return(
        <select name="" id="" onChange={selectStatus}>
            <option value="Active" label="Active"/>
            <option value="Blocked" label ="Blocked" />
        </select>
    )
}

export default UsersForAdmin