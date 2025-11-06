export default {


	async alterationHandover () {

		try {

			const payload_data = `
			Item: ${Text5.text}, 
			By: ${Input4.text},
			To: ${Input4Copy.text},
			Location: ${Input5.text},
			Comment: ${Input6.text}
			`;

			await Promise.all([

				receive_alteration.run(),
				handover_alteration.run(),
				upload_alteration_handovers.run(),


				//db event
				event_insert.run({
					event: 'db.insert', 
					event_from: 'appsmith frontend production', 
					event_to: 'bj.handovers', 
					actor: Input4.text, 
					payload: payload_data
				}),

				//biz event
				event_insert.run({
					event: 'business.alteration_product_received', 
					event_from: 'appsmith frontend production', 
					event_to: 'bj.handovers', 
					actor: Input4.text,
					payload: payload_data
				})



			])






			closeModal(Modal3.name);
			showAlert(`Received Handover: ${payload_data}`);

			await alterations.run();

		}

		catch(e) {
			showAlert('Error While Alteration Handover', 'error');

			const errorInfo = {
				name: e?.name || "UnknownError",
				message: e?.message || JSON.stringify(e),
				stack: e?.stack || "No stack trace"
			};

			const payloadString = JSON.stringify(errorInfo);

			await Promise.all([

				event_insert.run({
					event: 'error', 
					event_from: 'appsmith frontend production page alteration handover', 
					event_to: '-', 
					actor: Input4.text,
					payload: payloadString

				}),

				whatsapp_error.run({receiver: '03244811332', text: payloadString})


			])


			throw(e);
		}
	},


	async newmakeHandover () {

		try {

			const payload_data = `
			Item: ${Text5Copy.text}, 
			By: ${Input4Copy1.text},
			To: ${Input4CopyCopy.text},
			Location: ${Input5Copy.text},
			Comment: ${Input6Copy.text}
			`;

			await Promise.all([

				receive_newmake.run(),
				handover_newmake.run(),
				upload_newmake_handovers.run(),


				//db event
				event_insert.run({
					event: 'db.insert', 
					event_from: 'appsmith frontend production', 
					event_to: 'bj.handovers', 
					actor: Input4Copy1.text, 
					payload: payload_data
				}),

				//biz event
				event_insert.run({
					event: 'business.new_make_product_received', 
					event_from: 'appsmith frontend production', 
					event_to: 'bj.handovers', 
					actor: Input4Copy1.text,
					payload: payload_data
				})



			])






			closeModal(Modal3Copy.name);
			showAlert(`Received Handover: ${payload_data}`);

			await new_make.run();

		}

		catch(e) {
			showAlert('Error While NewMake Hangover', 'error');

			const errorInfo = {
				name: e?.name || "UnknownError",
				message: e?.message || JSON.stringify(e),
				stack: e?.stack || "No stack trace"
			};

			const payloadString = JSON.stringify(errorInfo);

			await Promise.all([

				event_insert.run({
					event: 'error', 
					event_from: 'appsmith frontend production page newmake handover', 
					event_to: '-', 
					actor: Input4Copy1.text,
					payload: payloadString

				}),

				whatsapp_error.run({receiver: '03244811332', text: payloadString})


			])


			throw(e);
		}
	},


	transitCheck () {

		if (Table1.triggeredRow.pcs_in_transit <= 0) {
			showAlert('No pieces in Transit. How can you receive? Take handover from supplier first!', 'error');
		}
		else {
			showModal(Modal_replenishment_receive.name);
		}

	},


	async replenishmentHandover () {

		try {


			const payload_data = `
			Item: ${Text5CopyCopy.text}, 
			By: ${Input4Copy1Copy.text},
			To: ${Input4CopyCopyCopy.text},
			Location: ${Input5CopyCopy.text},
			Comment: ${Input6CopyCopy.text}
			`;


			await Promise.all([

				receive_replenishment.run(),
				handover_replenishment.run(),
				upload_replenishment_handovers.run(),


				//db event
				event_insert.run({
					event: 'db.insert', 
					event_from: 'appsmith frontend production', 
					event_to: 'bj.handovers', 
					actor: Input4Copy1Copy.text, 
					payload: payload_data
				}),

				//biz event
				event_insert.run({
					event: 'business.new_make_product_received', 
					event_from: 'appsmith frontend production', 
					event_to: 'bj.handovers', 
					actor: Input4Copy1Copy.text,
					payload: payload_data
				})



			])






			closeModal(Modal_replenishment_receive.name);
			showAlert(`Received Replenishment Handover: ${payload_data}`);

			await sku_inventory_join.run();

		}
		catch(e) {
			showAlert('Error While Replenishment Handover', 'error');

			const errorInfo = {
				name: e?.name || "UnknownError",
				message: e?.message || JSON.stringify(e),
				stack: e?.stack || "No stack trace"
			};

			const payloadString = JSON.stringify(errorInfo);

			await Promise.all([

				event_insert.run({
					event: 'error', 
					event_from: 'appsmith frontend production page replenishment handover', 
					event_to: '-', 
					actor: Input4Copy1Copy.text,
					payload: payloadString

				}),

				whatsapp_error.run({receiver: '03244811332', text: payloadString})


			])


			throw(e);
		}
	}
}