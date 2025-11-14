export default {

	async customerUpdate () {
		try {

			
			if(Input4.text == '381000') {
			
						const payload_data = `Edited by: ${Select_Employee.selectedOptionValue} - Customer Name: ${Input3.text}, Phone: ${Input3Copy.text}, Address: ${Input3CopyCopy.text} `;
			
			
			await Promise.all([
				
			update_customer.run(),

			//db event
			event_insert.run({
				event: 'db.update', 
				event_from: 'appsmith frontend customer page', 
				event_to: 'bj.customer', 
				actor: Select_Employee.selectedOptionValue,
				payload: payload_data
			}),

			//biz event
		event_insert.run({
				event: 'business.customer_data_updated', 
				event_from: 'appsmith frontend customer page', 
				event_to: 'bj.customer', 
				actor: Select_Employee.selectedOptionValue, 
				payload: payload_data
			})
				
				
			])
			
			


			closeModal(Modal4.name);
			showAlert(`Updated: ${payload_data}`, 'success');

			await customers.run();

			}
			else {
			showAlert('Wrong Password', 'error');
			}


		}

					catch(e) {
				showAlert('Error Editing Customer Data!', 'error');

				const errorInfo = {
					name: e?.name || "UnknownError",
					message: e?.message || JSON.stringify(e),
					stack: e?.stack || "No stack trace"
				};

				const payloadString = JSON.stringify(errorInfo);

						await Promise.all([
							
				event_insert.run({
					event: 'error', 
					event_from: 'appsmith frontend update customer page', 
					event_to: '-', 
					actor: Select_Employee.selectedOptionValue,
					payload: payloadString

				}),
					
					whatsapp_error.run({receiver: '03244811332', text: payloadString})
					
					
				])


				throw(e);
			}


}
}