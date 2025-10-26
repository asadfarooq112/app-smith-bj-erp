export default {

		initializeArrayCounting: () => {
		storeValue('counting', []);
		},
			
			
	async closingReport () {

		if (Input6.text != '381000') {

			showAlert('Wrong Password', 'error')

		}
		else {

			try {
	
				const payload = `
						{
							"date": "${datetime.text}",
							"stockCounts": ${JSON.stringify(appsmith.store.counting)},
							"net_sales": "${net_sales.text}",
							"returns": "${returns.text}",
							"cash": "${cash.text}",
							"bank": "${bank.text}",
							"card": "${card.text}",
							"cod": "${cod.text}",
							"amount_due": "${due.text}",
							"cash_in_hand": "${dueCopy.text}",
							"calls": "${Input5.text}",
							"whatsapp": "${Input5Copy.text}",
							"insta": "${Input5Copy1.text}",
							"fb": "${Input5Copy2.text}"
						}
						`;

				
				
				
				const countingData = today_count.data.map(c => ({
				time: c.date_added,
					employee: c.employee_name,
					items_counted: c.count_data
				}))

				storeValue("counting", countingData);
				
				await Promise.all([
					
					inquiries_insert.run(),
					Api3.run(),
					
					//db event	
					event_insert.run({
					event: 'db.insert', 
					event_from: 'appsmith sales frontend daily report', 
					event_to: 'bj.num_of_inquiries', 
					actor: Select_EmployeeCopy.selectedOptionValue, 
					payload: payload
					}),
					
					event_insert.run({
					event: 'business.closing_report_generated', 
					event_from: 'appsmith sales frontend daily report', 
					event_to: 'bj.num_of_inquiries', 
					actor: Select_EmployeeCopy.selectedOptionValue, 
					payload: payload
					})
					
					
					
					
					
				])
				
				
				
				
				
				showAlert('Closing Report Generated');
				closeModal(Modal_closing.name);

			}

			catch(e) {
				showAlert('Closing Report Generation. Error!', 'error');
				throw(e);
			}



		}

	}
}