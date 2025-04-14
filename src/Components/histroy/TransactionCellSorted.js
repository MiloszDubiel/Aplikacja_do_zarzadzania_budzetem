import React from "react";
import { IoIosRemove } from "react-icons/io";
const TransactionCellSorted = ({history, deleteRecord, formatDate, sortBy}) =>{
    switch(sortBy){
        case 'category':
            history.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1) 
        break;

        case 'date':
            history.sort((a, b) => new Date(a.transaction_date).getTime() > new Date(b.transaction_date).getTime() ? 1 : -1)    
            break;

        case 'type':
            history.sort((a, b) => a.type > b.type ? 1 : -1)
            break;

        case 'description':
            history.sort((a, b) => a.description > b.description ? 1 : -1)
            break;

        case 'amount':
            history.sort((a, b) => a.amount > b.amount ? 1 : -1)
            break;

        default:
            break;
    }

    return history.map((el, i) =>{
        return (
            <tr key={i}>
                <td>
                    <p>{el.name}</p>
                </td>
                <td>{formatDate(el.transaction_date)}</td>
                <td>
                    {el.type == "Wydatki" ? <span className="status spend">{el.type}</span>	: <span className="status incom">{el.type}</span>	}
                </td>
                <td>{el.description}</td>
                <td>{el.amount}zł</td>
                <td><button className="delete-record" onClick={()=> deleteRecord(el)}><IoIosRemove /></button></td>
            </tr>
        )
    })    
}

export default TransactionCellSorted