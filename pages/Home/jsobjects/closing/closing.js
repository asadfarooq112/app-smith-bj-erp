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



				const todayCount = await today_count.run();
				const countingData = todayCount.map(c => ({
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
				showAlert('Error Generating Closing Report!', 'error');

				const errorInfo = {
					name: e?.name || "UnknownError",
					message: e?.message || JSON.stringify(e),
					stack: e?.stack || "No stack trace"
				};

				const payloadString = JSON.stringify(errorInfo);

				await Promise.all([
					
				event_insert.run({
					event: 'error', 
					event_from: 'appsmith frontend closing', 
					event_to: '-', 
					actor: Select_EmployeeCopy.selectedOptionValue,
					payload: payloadString

				}),
					
					whatsapp_error.run({receiver: '03244811332', text: payloadString})
					
					
				])

				throw(e);
			}



		}

	}
}