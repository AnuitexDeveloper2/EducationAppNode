import "./users.css";
import React, { useEffect, useState } from "react";
import  ReactTable  from "react-table-v6";
import Toggle from "react-toggle";
import  "react-toggle/style.css";
import { BaseFilter } from "../../shared/models/baseFilterModel";
import { SortType } from "../../shared/enums/sortType";
import { getUsers, blockUser } from "../../services/users";
import LastColumn from "../lastColumn/lastColumn";
import { getByTestId } from "@testing-library/react";
import { UserModel } from "../../shared/models/user/user";
import { Field, Form } from "react-final-form";

const UsersForAdmin = () => {

    const [data,setData] = useState({
        users:[],
        pages:0
    })

    const [user,setUser] = useState({
        item: {}})
    useEffect(()=>
        {getData(0)},[]
    )

       const passData =(currentUser) => {
            setUser({item: currentUser})
        }

    const getData = async(pages) => {
        
            const filter:BaseFilter = {
                searchString: '',
                pageNumber: pages + 1,
                pageSize: 10,
                sortTable: '',
                sortType: SortType.None,
        }     
           const users = await getUsers(filter)
           setData({users: users.data,pages: Math.floor(users.count/10+1)})
    }

    const changeStatus = async(id: string) => {
        debugger
        const result =await blockUser(id)
        if (result) {
            getData(0)
        }
    }
    

    const columns =[
        {
            Header: "Login",
            accessor: "userName"
        },
        {
            Header:"User Name",
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
        Header: props => {return(
            <div>

            <span>Status</span>
        <Form 
        onSubmit={changeStatus} 
        render={({}) =>( <div><Field name="status" component="select">
        <option> </option>
        <option>Active</option>
        <option>Blocked</option>
        </Field>
        </div>
        )}
        />
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
             
             pages={data.pages}
             onFetchData={(state) =>{
                 getData(state.page)
                }}
                />
                </div>
    )
}

export default UsersForAdmin