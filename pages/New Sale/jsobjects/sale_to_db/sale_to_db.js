export default {

	async saleToDB () {
		
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
		
		
		//////////////////////////////////////////////////
		
		for (const item of products) {
			
		//using Promise.all to run async together (since the queries dont depend on one another)
		await Promise.all([
			
			
		// sale_item to DB
		sale_items_insert.run({sale_id: sale_id, inventory_id: item.inventory_id, offered_price: offered_price}),
							
				//db event for sale_item
			event_insert.run({
					event: 'db.insert', 
					event_from: 'appsmith sales frontend', 
					event_to: 'bj.sale_items', 
					actor: employeeActor, 
					payload: `sale_id: ${sale_id}, inventory_id:${item.inventory_id}, code: ${item.code}`
				}),
			
			//Remove that product from inventory
	sell_inventory.run({inventory_id: item.inventory_id}),
			
						
				//db event for inventory remove
		event_insert.run({
					event: 'db.remove', 
					event_from: 'appsmith sales frontend', 
					event_to: 'bj.inventory', 
					actor: employeeActor, 
					payload: `inventory_id:${item.inventory_id}, code: ${item.code}`
				})
			
			
			
			])


		}
		//	use async-await or promises
		//	await storeValue('varName', 'hello world')
	}
}