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

					catch(e) {
				showAlert('Error Adding New Customer!', 'error');

				const errorInfo = {
					name: e?.name || "UnknownError",
					message: e?.message || JSON.stringify(e),
					stack: e?.stack || "No stack trace"
				};

				const payloadString = JSON.stringify(errorInfo);

				event_insert.run({
					event: 'error', 
					event_from: 'appsmith frontend insert customer page', 
					event_to: '-', 
					actor: employee_adding_customer.selectedOptionValue,
					payload: payloadString

				})

				throw(e);
			}


}