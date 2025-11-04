export default {

	async saleToDB () {
		
		try {
		
		const sale_id = appsmith.store.sale_uuid;
		const products = appsmith.store.products;
		const offered_price = Number(total_offered_price.text);
		const employeeActor = Select1.selectedOptionValue;
		
		await Promise.all([
			
		//add sale in db	
		sale_add.run({sale_id: sale_id}),	
		
		//sale db event	
		event_insert.run({
					event: 'db.insert', 
					event_from: 'appsmith sales frontend', 
					event_to: 'bj.sales', 
					actor: employeeActor, 
					payload: `sale_id: ${sale_id}`
}),
		
				//sale biz event	
		event_insert.run({
					event: 'business.sale_insert', 
					event_from: 'appsmith sales frontend', 
					event_to: 'bj.sales', 
					actor: employeeActor, 
					payload: `sale_id: ${sale_id}`
}),
			
					// add financial transaction
		financial_transaction_insert.run({type: 'sale', type_id: sale_id, amount: Number(total_paid.text)})

		]);
		
		if(input_cash.text) {

		await cash_tx_input.run({cash_tx_value: Number(input_cash.text), source: 'sale'})
		} 
		
		
		// //////////////////////////////////////////////////
		// 
		// for (const item of products) {
			// 
		// //using Promise.all to run async together (since the queries dont depend on one another)
		// await Promise.all([
			// 
			// 
		// // sale_item to DB
		// sale_items_insert.run({sale_id: sale_id, inventory_id: item.inventory_id, offered_price: offered_price}),
							// 
				// //db event for sale_item
			// event_insert.run({
					// event: 'db.insert', 
					// event_from: 'appsmith sales frontend', 
					// event_to: 'bj.sale_items', 
					// actor: employeeActor, 
					// payload: `sale_id: ${sale_id}, inventory_id:${item.inventory_id}, code: ${item.code}`
				// }),
			// 
			// //Remove that product from inventory
	// sell_inventory.run({inventory_id: item.inventory_id}),
			// 
						// 
				// //db event for inventory remove
		// event_insert.run({
					// event: 'db.remove', 
					// event_from: 'appsmith sales frontend', 
					// event_to: 'bj.inventory', 
					// actor: employeeActor, 
					// payload: `inventory_id:${item.inventory_id}, code: ${item.code}`
				// })
			// 
			// 
			// 
			// ])

		// Instead of above commented, (which is waiting for each loop to finihs before next loop becasue of await Promise separately in each loop, I am below first adding all the promises from all loop iterations in an array and then doing await Promise.all([that big array]))

		
		// Run all products' operations in parallel batches
const promises = [];

for (const item of products) {
  promises.push(
    Promise.all([
      // Insert sale_item record
      sale_items_insert.run({
        sale_id: sale_id,
        inventory_id: item.inventory_id,
        offered_price: offered_price
      }),

      // Event: sale_item inserted
      event_insert.run({
        event: 'db.insert',
        event_from: 'appsmith sales frontend',
        event_to: 'bj.sale_items',
        actor: employeeActor,
        payload: `sale_id:${sale_id}, inventory_id:${item.inventory_id}, code:${item.code}`
      }),

      // Remove product from inventory
      sell_inventory.run({ inventory_id: item.inventory_id }),

      // Event: inventory removed
      event_insert.run({
        event: 'db.remove',
        event_from: 'appsmith sales frontend',
        event_to: 'bj.inventory',
        actor: employeeActor,
        payload: `inventory_id:${item.inventory_id}, code:${item.code}`
      }),
			
			
			certificate_email.run({cert_data: item})
			
    ])
  );
}

// Wait for whole batch to finish, but the batch runs together
await Promise.all(promises);

		
		
		}
		catch(e) {
console.log (e)
			throw(e);
		}
		
		
		
		},

	async invoiceDowload () {
	
		try {
		await invoice_buffer_get_and_email.run();
		const url = `http://178.156.165.247:8080${invoice_buffer_get_and_email.data.url_path}`;
		
		console.log(url);
		
    showModal(Modal2.name);
		}
		catch(e) {
console.log (e)
			throw(e);
		}
	},
	
	async runSale(){

		try {
		await this.saleToDB ();
		await this.invoiceDowload();
		await storeValue('products', []);
			
						resetWidget("input_cash");
						resetWidget("input_card");
						resetWidget("input_cod");
						resetWidget("input_exchange_adjustment");
						resetWidget("Select2");
						resetWidget("Input1");
						resetWidget("DatePicker1");
						resetWidget("cust_address");
						resetWidget("cust_name");
						resetWidget("cust_phone");
						resetWidget("input_bank_transfer");
						resetWidget("Select1");
						resetWidget("Select1Copy");

		}

				catch(e) {
				showAlert('Error Processing the Sale', 'error');

				const errorInfo = {
					name: e?.name || "UnknownError",
					message: e?.message || JSON.stringify(e),
					stack: e?.stack || "No stack trace"
				};

				const payloadString = JSON.stringify(errorInfo);

				event_insert.run({
					event: 'error', 
					event_from: 'appsmith frontend new sale page', 
					event_to: '-', 
					actor: Select1.selectedOptionValue,
					payload: payloadString

				})

				throw(e);
			}
		
}
	
}

