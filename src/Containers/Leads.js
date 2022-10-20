import React, { useCallback } from 'react';
import serverInstance from '../Api/AxiosOrder';
import DataTable from 'react-data-table-component';
import Spinner from '../Component/UI/Spinner/Spinner';
import SplitCamelCase from '../Component/splitCamelCase';

function Leads() {

	const [leadsLoading, setLeadsLoading] = React.useState(true);
	const [dataTable, setDataTable] = React.useState([]);
	const [dataID, setDataID] = React.useState([]);
	
	React.useEffect(() => {
		
		serverInstance.get('https://this-is-the-test-3d4bb.firebaseio.com/milkTeaOrder.json')
			.then(response => {		

				const resultArray = Object.keys(response.data).map((item, index) => {
					let resultData = response.data[item]
					return resultData;
				})

				
				setDataID(Object.keys(response.data+" "));
				//console.log(resultArray)
				setDataTable(resultArray);
				
			
			})
			.catch(response => {
				console.log(response)
				//setLeadsLoaded(false);
			})
		
	}, [dataTable])

	React.useEffect(() => {
		const timeout = setTimeout(() => {
			setLeadsLoading(false);
		}, 1000);
		return () => clearTimeout(timeout);
	}, []);

	function onDelete(id) {
		const newList = dataTable.filter((item, index) => index !== id);
		const newdataID = dataID.filter((item, index) => index === id);
		//setDataTable(newList)

		serverInstance.delete(`https://this-is-the-test-3d4bb.firebaseio.com/milkTeaOrder/${newdataID[0]}.json`)
			.then(response => { 
				console.log('Delete Successfully');
				console.log(response)
			})
	}

	function updateStatus(id) {
	
		const dataItem = dataTable.filter((item, index) => index === id && item );
		const newdataURL = dataID.filter((item, index) => index === id);

		console.log(dataItem)
		
		const newOrder = {
			tea: dataItem[0].tea,
			addOns: dataItem[0].addOns,
			price: dataItem[0].price,
			name: dataItem[0].name,
			address: dataItem[0].address,
			orderStatus: 'Completed..'
		}

		serverInstance.put(`https://this-is-the-test-3d4bb.firebaseio.com/milkTeaOrder/${newdataURL[0]}.json`, newOrder)
			.then(response => {
				console.log('Updated Successfully');
				console.log(response)
			})
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
					return (<SplitCamelCase text={' '+item } ></SplitCamelCase >)
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
						<button className='button--small button--primary action' onClick={() => onDelete(id)} >Delete</button>	
						
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

  	return (
			<div className='container'>
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
		</div>
  	)
}

export default Leads