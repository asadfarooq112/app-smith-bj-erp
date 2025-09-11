export default {

	async customerCheck () {

		if (!cust_name.text.trim() && !cust_phone.text.trim()) {
showAlert('Enter Customer Name or Phone');
			return;
		}
		
		if(cust_name.text) {
	
			const data = await search_cust_by_name.run({value: `${cust_name.text}%`});
			return data;
		}
			
		else {
		
			const data = await search_cust_by_phone.run({value: `${cust_phone.text}%`});
			return data;
			
		}
			
		
	},
	
	async insertCustomer () {
		try {

			await customer_add.run();

			const payload_data = `Name: ${cust_name.text}, Phone: ${cust_phone.text}, Address: ${cust_address.text} `;

			//db event
			await event_insert.run({
				event: 'db.insert', 
				event_from: 'appsmith frontend', 
				event_to: 'bj.customer', 
				actor: appsmith.user.name, 
				payload: payload_data
			})

			//biz event
			await event_insert.run({
				event: 'business.customer_insert', 
				event_from: 'appsmith frontend', 
				event_to: 'bj.customer', 
				actor: 'employee', 
				payload: payload_data
			})


			showAlert(`Inserted New customer: ${payload_data}`);
			console.log(payload_data);


		}
		catch (e) {
			console.log(e?.message);
			throw(e);
		}
	}

	
	
}