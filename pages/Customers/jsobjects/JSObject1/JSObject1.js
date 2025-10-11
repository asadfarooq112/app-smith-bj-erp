export default {
// 
	// async editInventory () {
// 
		// try {
// 
			// if (input_password.text == 381000) {
// 
				// await update_inventory.run();
// 
				// const payload_data = `Code: ${Text2.text}, Size: ${input_edit_size.text}, Metal Weight ${input_edit_metal_w.text}, Diamond Weight ${input_edit_diamond_w.text}`;
// 
				// //db event
				// await event_insert.run({
					// event: 'db.update', 
					// event_from: 'appsmith frontend', 
					// event_to: 'bj.inventory', 
					// actor: 'employee', 
					// payload: payload_data
				// });
// 
				// //biz event
				// await event_insert.run({
					// event: 'business.inventory_update', 
					// event_from: 'appsmith frontend', 
					// event_to: 'bj.inventory', 
					// actor: 'employee', 
					// payload: payload_data
				// });
// 
// 
				// closeModal(Edit_Inventory.name);
				// showAlert(`Updated: ${payload_data}`);
				// console.log(payload_data);
// 
				// await join_inventory_sku.run();
// 
// 
			// }
			// else {
				// showAlert('Wrong Password')
			// }
// 
		// }
// 
		// catch(e) {
			// console.log(e?.message);
			// throw(e);
		// }
// 
	// },
// 
	// //////////////

	async insertCustomer () {
		try {

			await customer_add.run();

			const payload_data = `Name: ${input_cust_name.text}, Phone: ${input_cust_phone.text}, Address: ${input_cust_address.text} `;

			//db event
			await event_insert.run({
				event: 'db.insert', 
				event_from: 'appsmith frontend customer page', 
				event_to: 'bj.customer', 
				actor: employee_adding_customer.selectedOptionValue, 
				payload: payload_data
			})

			//biz event
			await event_insert.run({
				event: 'business.customer_insert', 
				event_from: 'appsmith frontend customer page', 
				event_to: 'bj.customer', 
				actor: employee_adding_customer.selectedOptionValue, 
				payload: payload_data
			})


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