export default {

	async dueReceive () {

		try {
					
		if (Input1CopyCopy.text == '381000') {

			const due_receive_id = crypto.randomUUID();
			
			await Promise.all ([
				
				
				due_receive_insert.run({due_receive_id: due_receive_id}),
				
				update_sales_due_receivings.run(),
				
				financial_transaction_insert.run({type: 'due_receive', type_id: due_receive_id, amount: Number(amount_due_receive.text)}),
				
				
				
				//db event
			event_insert.run({
				event: 'db.insert', 
				event_from: 'appsmith frontend finances', 
				event_to: 'bj.due_receive', 
				actor: `Employee ${employeeCopyCopy.selectedOptionValue}`, 
				payload: `Due Received. Amount: ${amount_due_receive.text}, Method: ${method_due_receive.selectedOptionValue}`
			}),
				
				//db event
			event_insert.run({
				event: 'db.update', 
				event_from: 'appsmith frontend finances', 
				event_to: 'bj.sales', 
				actor: `Employee ${employeeCopyCopy.selectedOptionValue}`, 
				payload: `Received due Amount for Sale: ${Table3.triggeredRow.sale_id}. Amount: ${amount_due_receive.text}, Method: ${method_due_receive.selectedOptionValue}. total_paid is incremented by this amount, and amount_due is decremented by this amount`
			}),
				
								//db event
			event_insert.run({
				event: 'db.insert', 
				event_from: 'appsmith frontend finances', 
				event_to: 'bj.financial_transactions', 
				actor: `Employee ${employeeCopyCopy.selectedOptionValue}`, 
				payload: `Due Received. Amount: ${amount_due_receive.text}, Type: ${method_due_receive.selectedOptionValue}`
			}),
				
			//business event
			event_insert.run({
			event: 'business.due_received', 
			event_from: 'appsmith frontend finance', 
			event_to: 'bj.due_receive', 
			actor: `Employee ${employeeCopyCopy.selectedOptionValue}`, 
			payload: `Received due Amount for Sale: ${Table3.triggeredRow.sale_id}. Amount: ${amount_due_receive.text}, Method: ${method_due_receive.selectedOptionValue}`
			})
				
				
				
			]);
			
			if (method_due_receive.selectedOptionValue == 'cash') {
			await cash_tx_input.run({cash_tx_value: Number(amount_due_receive.text), source: 'due_receive'})
			};
			
			closeModal(Modal_due_receive.name);
			showAlert(`Added ${amount_due_receive.text} as Due Receive`);

			
		}
			else {
		
				showAlert('Wrong Password');
				
			}
			
		}

		
						catch(e) {
				showAlert('Error While Due Receive', 'error');

				const errorInfo = {
					name: e?.name || "UnknownError",
					message: e?.message || JSON.stringify(e),
					stack: e?.stack || "No stack trace"
				};

				const payloadString = JSON.stringify(errorInfo);

							await Promise.all([
								
				event_insert.run({
					event: 'error', 
					event_from: 'appsmith frontend finance page due receive', 
					event_to: '-', 
					actor: employeeCopyCopy.selectedOptionValue,
					payload: payloadString

				}),
					
					whatsapp_error.run({receiver: '03244811332', text: payloadString})
					
					
				])


				throw(e);
			}
	
	}
		
	
}