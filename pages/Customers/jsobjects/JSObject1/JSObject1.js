export default {


	async insertCustomer () {
		try {

						const payload_data = `Name: ${input_cust_name.text}, Phone: ${input_cust_phone.text}, Address: ${input_cust_address.text} `;
			
			
			Promise.all([
				
			customer_add.run(),

			//db event
			event_insert.run({
				event: 'db.insert', 
				event_from: 'appsmith frontend customer page', 
				event_to: 'bj.customer', 
				actor: employee_adding_customer.selectedOptionValue, 
				payload: payload_data
			}),

			//biz event
		event_insert.run({
				event: 'business.customer_insert', 
				event_from: 'appsmith frontend customer page', 
				event_to: 'bj.customer', 
				actor: employee_adding_customer.selectedOptionValue, 
				payload: payload_data
			})
				
				
			])
			
			


			closeModal(add_customer.name);
			showAlert(`Inserted: ${payload_data}`);
			console.log(payload_data);

			await customers.run();



		}
		catch (e) {
			console.log(e?.message);
			throw(e);
		}
	}


}