export default {

	async editInventory () {

		try {

			if (input_password.text == 381000) {

								const payload_data = `Code: ${Text2.text}, Size: ${input_edit_size.text}, Metal Weight ${input_edit_metal_w.text}, Diamond Weight ${input_edit_diamond_w.text}`;
				
				Promise.all([
					
						
				update_inventory.run(),

				//db event
				event_insert.run({
					event: 'db.update', 
					event_from: 'appsmith frontend', 
					event_to: 'bj.inventory', 
					actor: Select1CopyCopy1.selectedOptionValue, 
					payload: payload_data
				}),

				//biz event
				event_insert.run({
					event: 'business.inventory_update', 
					event_from: 'appsmith frontend', 
					event_to: 'bj.inventory', 
					actor: Select1CopyCopy1.selectedOptionValue, 
					payload: payload_data
				})

					
				])
			

				closeModal(Edit_Inventory.name);
				showAlert(`Updated: ${payload_data}`);
				console.log(payload_data);

				await join_inventory_sku.run();


			}
			else {
				showAlert('Wrong Password')
			}

		}

					catch(e) {
				showAlert('Error Editing Inventory!', 'error');

				const errorInfo = {
					name: e?.name || "UnknownError",
					message: e?.message || JSON.stringify(e),
					stack: e?.stack || "No stack trace"
				};

				const payloadString = JSON.stringify(errorInfo);

				event_insert.run({
					event: 'error', 
					event_from: 'appsmith frontend edit inventory', 
					event_to: '-', 
					actor: Select1CopyCopy1.selectedOptionValue,
					payload: payloadString

				})

				throw(e);
			}

	},

	//////////////

	async insertInventory () {
		try {
			
			
			const payload_data = `Code: ${code_select_add.selectedOptionValue}, Size: ${Input_1.text}, Metal Weight ${Input2.text}, Diamond Weight ${Input3.text}`;

			
			Promise.all([
				
			insert_new_inventory.run(),


			//db event
			event_insert.run({
				event: 'db.insert', 
				event_from: 'appsmith frontend', 
				event_to: 'bj.inventory', 
				actor: Select1CopyCopy.selectedOptionValue, 
				payload: payload_data
			}),

			//biz event
			event_insert.run({
				event: 'business.inventory_insert', 
				event_from: 'appsmith frontend', 
				event_to: 'bj.inventory', 
				actor: Select1CopyCopy.selectedOptionValue, 
				payload: payload_data
			})

				
				
			])
			

			closeModal(Modal1.name);
			showAlert(`Inserted: ${payload_data}`);
			console.log(payload_data);

			
			await join_inventory_sku.run();



		}

catch(e) {
				showAlert('Error inserting Inventory!', 'error');

				const errorInfo = {
					name: e?.name || "UnknownError",
					message: e?.message || JSON.stringify(e),
					stack: e?.stack || "No stack trace"
				};

				const payloadString = JSON.stringify(errorInfo);

				event_insert.run({
					event: 'error', 
					event_from: 'appsmith frontend add inventory', 
					event_to: '-', 
					actor: Select1CopyCopy.selectedOptionValue,
					payload: payloadString

				})

				throw(e);
			}
		
		
	}


}