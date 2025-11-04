export default {


	
async expenseMake () {
		
		try {
					
		if (Input1Copy1.text == '381000') {
			
		const expense_id = crypto.randomUUID();
			
			await Promise.all ([
				
				
				expense_insert.run({expense_id: expense_id}),
				financial_transaction_insert.run({type: 'expense', type_id: expense_id, amount: Number(amountINCopy.text)*-1}),
				
				//db event
			event_insert.run({
				event: 'db.insert', 
				event_from: 'appsmith frontend finances', 
				event_to: 'bj.financial_transactions', 
				actor: `Employee ${employeeCopy1.selectedOptionValue}`, 
				payload: `Expense Made. Amount: ${amountINCopy.text}, Method: ${Select1Copy1.selectedOptionValue}`
			}),
				
								//db event
			event_insert.run({
				event: 'db.insert', 
				event_from: 'appsmith frontend finance', 
				event_to: 'bj.expenses', 
				actor: `Employee ${employeeCopy1.selectedOptionValue}`, 
				payload: `Expense Made. Amount: ${amountINCopy.text}, Method: ${Select1Copy1.selectedOptionValue}`
			}),

			//biz event
			event_insert.run({
				event: 'business.expense_made', 
				event_from: 'appsmith frontend finance', 
				event_to: 'bj.expenses', 
				actor: `Employee ${employeeCopy1.selectedOptionValue}`, 
				payload: `Expense Made. Amount: ${amountINCopy.text}, Method: ${Select1Copy1.selectedOptionValue}`
			})
				
				
			
				
				
				
			]);
			
		if (Select1Copy1.selectedOptionValue == 'cash') {
			await cash_tx_input.run({cash_tx_value: Number(amountINCopy.text)*-1, source: 'expense'})
			};
			
		if (FilePicker1.files[0]) {
		await upload_expense_image.run();
			console.log('expense made');
			
			closeModal(Modal_expense.name);
			showAlert(`Expense Made of Amount ${amountINCopy.text}`);

		}

			
		}
			
		else {
		showAlert('Wrong Password');
			}
			
		}

	
					catch(e) {
				showAlert('Error While Expense Make', 'error');

				const errorInfo = {
					name: e?.name || "UnknownError",
					message: e?.message || JSON.stringify(e),
					stack: e?.stack || "No stack trace"
				};

				const payloadString = JSON.stringify(errorInfo);

				event_insert.run({
					event: 'error', 
					event_from: 'appsmith frontend finance page expense make', 
					event_to: '-', 
					actor: employeeCopy1.selectedOptionValue,
					payload: payloadString

				})

				throw(e);
			}
	
	}
	
	}