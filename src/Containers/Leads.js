import React, { useCallback } from 'react';
import serverInstance from '../Api/AxiosOrder';
import DataTable from 'react-data-table-component';
import Spinner from '../Component/UI/Spinner/Spinner';
import SplitCamelCase from '../Component/splitCamelCase';
import Alert from '../Component/UI/Alert/Alert';
import Modal from '../Component/UI/Modal/Modal';
import Confirmation from '../Component/UI/Confirmation/Confirmation';
import axios from 'axios';

const serverURL = 'https://this-is-the-test-3d4bb.firebaseio.com'

function Leads() {

	const [leadsLoading, setLeadsLoading] = React.useState(true);
	const [dataTable, setDataTable] = React.useState([]);
	const [dataID, setDataID] = React.useState([]);
	const [alert, setAlert] = React.useState({
		message: false,
		info: "success"
	});
	const [modalState, setModalState] = React.useState(false);
	const [deleteID, setDeleteID] = React.useState();
	const [name, setName] = React.useState();

	React.useEffect(() => {

		const cancelToken = axios.CancelToken.source();

		serverInstance.get(serverURL + '/milkTeaOrder.json', {
			cancelToken: cancelToken.token,
		})
			.then(response => {

				const resultArray = Object.keys(response.data).map((item, index) => {
					let resultData = response.data[item]
					return resultData;
				})

				setDataID(Object.keys(response.data));
				console.log(resultArray)
				setDataTable(resultArray);


			})
			.catch(error => {
				if (axios.isCancel(error)) {
					console.log('Cancelled Token');
				}

				console.log(error.message)
				//setLeadsLoaded(false);
			})
		
		return () => {
			cancelToken.cancel();
		}	

	}, [])

	React.useEffect(() => {
		if (alert.message) {
			const alertTimeout = setTimeout(() => {
				setAlert({
					message: false,
					info: "success"
				});
			}, 4000)

			return () => {
				clearTimeout(alertTimeout);
			}
		} else {
			return;
		}
		
	}, [alert])

	React.useEffect(() => {
		const timeout = setTimeout(() => {
			setLeadsLoading(false);
		}, 1000);
		return () => clearTimeout(timeout);
	}, []);

	function onDelete(id) {
		setName(dataTable[id].name);
		const newList = dataTable.filter((item, index) => index !== id);
		const newdataID = dataID.filter((item, index) => index === id);
		setDataTable(newList)

		serverInstance.delete(`${serverURL}/milkTeaOrder/${newdataID[0]}.json`)
			.then(response => {
				// console.log('Delete Successfully');
				setAlert({
					message: true,
					info: "success"
				});
			})
			.catch(error => {
				setAlert({
					message: true,
					info: "error"
				});
			})
	}

	function openConfirmation(id) {
		setName(dataTable[id].name);
		setDeleteID(id);
		setModalState(true)
	}

	function updateStatus(id) {
		setName(dataTable[id].name);
		const newList = dataTable.filter((item, index) => index === id);
		const newdataID = dataID.filter((item, index) => index === id);

		setDataTable(prevData => {
			return prevData.map((item, index) => {
				return index === id ? {
					...item,
					orderStatus: 'Completed'
				} : item
			})
		})

		const newOrder = {
			tea: newList[0].tea,
			addOns: newList[0].addOns,
			price: newList[0].price,
			name: newList[0].name,
			address: newList[0].address,
			orderStatus: 'Completed..'
		}

		serverInstance.put(`${serverURL}/milkTeaOrder/${newdataID[0]}.json`, newOrder, )
			.then(response => {
				console.log('Updated Successfully');
				setAlert({
					message: true,
					info: "updated"
				});
			})
			.catch(error => {
				setAlert({
					message: true,
					info: "error"
				});
			})
	}

	function BackDropHandler() {
		setModalState(!modalState);
	}

	const handleChange = useCallback(state => {
		setDataTable(state.dataTable);
	}, []);

	const conditionalRowStyles = [
		{
			when: row => row.orderStatus === 'Preparing..',
			style: {
				backgroundColor: '#c0e9fb',
				color: '#000',

			},
		},

	];

	const columnName = [
		{
			name: "Name",
			selector: row => row.name,
			sortable: true
		},
		{
			name: "Address",
			selector: row => row.address,
			sortable: true
		},
		{
			name: "Tea Type",
			selector: row => row.tea,
			sortable: true
		},
		{
			name: "Addons",
			selector: row => {
				const json = Object.keys(row.addOns).map(item => {
					if (row.addOns[item] !== 0) {
						return (< ><SplitCamelCase key={item} text={' ' + item} ></SplitCamelCase ></>)
					}
				});
				return json
			},
			sortable: false,
			wrap: true,
			minWidth: '200px',
		},
		{
			name: "Prices",
			selector: row => 'Php ' + row.price,
			sortable: true
		},
		{
			name: "Status",
			selector: row => row.orderStatus,
			sortable: true

		},
		{
			name: "Action",
			cell: (row, id) => (
				<React.Fragment>
					{row.orderStatus === 'Preparing..'
						?
						<button className='button--small button--primary info' onClick={() => updateStatus(id)}>Order Complete</button>
						:
						<button className='button--small button--primary action' onClick={() => openConfirmation(id)} >Delete</button>

					}
				</React.Fragment>
			)
			,
			minWidth: '200px',
			wrap: true,
			ignoreRowClick: true,
			allowOverflow: true,
			button: true,
		}
	]

	const CustomLoader = () => (
		<div style={{ padding: '24px' }}>
			<Spinner spinnerstate="true" />
		</div>
	);

	console.log(name !== undefined ? name : '')

	return (
		<div className='container'>
			<Alert
				show={alert.message}
				info={alert.info}
				name={name !== undefined ? name : ''}
			></Alert>
			<div className='data-table-wrapper'>

				<DataTable
					data={dataTable}
					columns={columnName}
					striped={true}
					onSelectedRowsChange={handleChange}
					conditionalRowStyles={conditionalRowStyles}
					pagination
					progressPending={leadsLoading}
					progressComponent={<CustomLoader />}
				/>

			</div>
			<Modal show={modalState} hideBackdrop={BackDropHandler}>
				<Confirmation
					onDelete={() => onDelete(deleteID)}
					name={name !== undefined ? name : ''}
				></Confirmation>
			</Modal>
		</div>
	)
}

export default Leads