export default {

	async capitalIn () {
		
		try {
					
		if (Input1.text == '381000') {

			const capital_in_id = crypto.randomUUID();
			
			await Promise.all ([
				
				
				capital_in_insert.run({capital_in_id: capital_in_id}),
				financial_transaction_insert.run({type: 'capital_in', type_id: capital_in_id, amount: Number(amountIN.text)}),
				
				//db event
			event_insert.run({
				event: 'db.insert', 
				event_from: 'appsmith frontend finances', 
				event_to: 'bj.financial_transactions', 
				actor: `Employee ${employee.selectedOptionValue}`, 
				payload: `Capital In. Amount: ${amountIN.text}, Method: ${Select1.selectedOptionValue}`
			}),
				
								//db event
			event_insert.run({
				event: 'db.insert', 
				event_from: 'appsmith frontend finance', 
				event_to: 'bj.capital_in', 
			actor: `Employee ${employee.selectedOptionValue}`, 
				payload: `Capital In. Amount: ${amountIN.text}, Method: ${Select1.selectedOptionValue}`
			}),

			//biz event
			event_insert.run({
				event: 'business.capital_in', 
				event_from: 'appsmith frontend finance', 
				event_to: 'bj.capital_in', 
		actor: `Employee ${employee.selectedOptionValue}`, 
				payload: `Capital In. Amount: ${amountIN.text}, Method: ${Select1.selectedOptionValue}`
			})
			
				
				
				
			]);
			
			if (Select1.selectedOptionValue == 'cash') {
			await cash_tx_input.run({cash_tx_value: Number(amountIN.text), source: 'capital_in'})
			};
			
			closeModal(Modal1.name);
			showAlert(`Added ${amountIN.text} as Capital In`);
			
		}
			else {
		
				showAlert('Wrong Password');
				
			}
			
		}
		catch(e) {
console.log (e)
			throw(e);
		}
	
	},
	
	
	
	async capitalOut () {
		
		try {
					
		if (Input1Copy.text == '381000') {
			
		const capital_out_id = crypto.randomUUID();
			
			await Promise.all ([
				
				
				capital_out_insert.run({capital_out_id: capital_out_id}),
				financial_transaction_insert.run({type: 'capital_out', type_id: capital_out_id, amount: Number(amountCopy.text)*-1}),
				
				//db event
			event_insert.run({
				event: 'db.insert', 
				event_from: 'appsmith frontend finances', 
				event_to: 'bj.financial_transactions', 
				actor: `Employee ${employeeCopy.selectedOptionValue}`, 
				payload: `Capital Out. Amount: ${amountCopy.text}, Method: ${Select1Copy.selectedOptionValue}`
			}),
				
								//db event
			event_insert.run({
				event: 'db.insert', 
				event_from: 'appsmith frontend finance', 
				event_to: 'bj.capital_out', 
				actor: `Employee ${employeeCopy.selectedOptionValue}`, 
				payload: `Capital Out. Amount: ${amountCopy.text}, Method: ${Select1Copy.selectedOptionValue}`
			}),

			//biz event
			event_insert.run({
				event: 'business.capital_out', 
				event_from: 'appsmith frontend finance', 
				event_to: 'bj.capital_out', 
				actor: `Employee ${employeeCopy.selectedOptionValue}`, 
				payload: `Capital Out. Amount: ${amountCopy.text}, Method: ${Select1Copy.selectedOptionValue}`
			})
			
				
				
				
			]);
			
						if (Select1Copy.selectedOptionValue == 'cash') {
			await cash_tx_input.run({cash_tx_value: Number(amountCopy.text)*-1, source: 'capital_out'})
			};
			
			closeModal(Modal1Copy.name);
			showAlert(`Added ${amountCopy.text} as Capital Out`);
			
		}
			else {
		
				showAlert('Wrong Password');
				
			}
			
		}
		catch(e) {
console.log (e)
			throw(e);
		}
	
	},
	
	
	
}