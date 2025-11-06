export default {

	async addAlteration () {
		try {



			const payload_data = `
			Code: ${code_select_add.selectedOptionValue}, 
			Type: Alteration,
			Alteration type: ${Select1.selectedOptionValue},
			Customer: ${Input3.text},
			Employee: ${Select1CopyCopy.selectedOptionValue}
			`;

			await Promise.all([

				insert_alteration.run(),

				//db event
				event_insert.run({
					event: 'db.insert', 
					event_from: 'appsmith frontend production', 
					event_to: 'bj.alterations_or_new_make', 
					actor: Select1CopyCopy.selectedOptionValue, 
					payload: payload_data
				}),

				//biz event
				event_insert.run({
					event: 'business.new_alteration_registered', 
					event_from: 'appsmith frontend production', 
					event_to: 'bj.alterations_or_new_make', 
					actor: Select1CopyCopy.selectedOptionValue, 
					payload: payload_data
				})



			])






			closeModal(Modal2.name);
			showAlert(`New Alteration: ${payload_data}`);

			await alterations.run();

		}

		catch(e) {
			showAlert('Error Adding Alteration', 'error');

			const errorInfo = {
				name: e?.name || "UnknownError",
				message: e?.message || JSON.stringify(e),
				stack: e?.stack || "No stack trace"
			};

			const payloadString = JSON.stringify(errorInfo);

			await Promise.all([

				event_insert.run({
					event: 'error', 
					event_from: 'appsmith frontend production page add alteration', 
					event_to: '-', 
					actor: Select1CopyCopy.selectedOptionValue,
					payload: payloadString

				}),

				whatsapp_error.run({receiver: '03244811332', text: payloadString})


			])


			throw(e);
		}
	},





	async addNewMake () {
		try {



			const payload_data = `
			Code: ${code_select_addCopy.selectedOptionValue}, 
			Type: New Make (customer new order),
			Customer: ${Input3Copy.text},
			Employee: ${Select1CopyCopyCopy.selectedOptionValue}
			`;

			await Promise.all([

				await insert_new_make.run(),

				//db event
				event_insert.run({
					event: 'db.insert', 
					event_from: 'appsmith frontend production', 
					event_to: 'bj.alterations_or_new_make', 
					actor: Select1CopyCopyCopy.selectedOptionValue, 
					payload: payload_data
				}),

				//biz event
				event_insert.run({
					event: 'business.new_customer_new_make_registered', 
					event_from: 'appsmith frontend production', 
					event_to: 'bj.alterations_or_new_make', 
					actor: Select1CopyCopyCopy.selectedOptionValue, 
					payload: payload_data
				})



			])






			closeModal(Modal_new_make.name);
			showAlert(`New Customer Order: ${payload_data}`);

			await new_make.run();

		}

		catch(e) {
			showAlert('Error Adding Customer Order', 'error');

			const errorInfo = {
				name: e?.name || "UnknownError",
				message: e?.message || JSON.stringify(e),
				stack: e?.stack || "No stack trace"
			};

			const payloadString = JSON.stringify(errorInfo);


			await Promise.all([


				event_insert.run({
					event: 'error', 
					event_from: 'appsmith frontend production page add customer order', 
					event_to: '-', 
					actor: Select1CopyCopyCopy.selectedOptionValue,
					payload: payloadString

				}),

				whatsapp_error.run({receiver: '03244811332', text: payloadString})


			])


			throw(e);
		}
	}
}