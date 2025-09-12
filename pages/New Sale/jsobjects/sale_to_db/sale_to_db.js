export default {

	async saleToDB () {
		
		const sale_id = appsmith.store.sale_uuid;
		const products = appsmith.store.products;
		const offered_price = Number(total_offered_price.text);
		
		Promise.all([
			
		await sale_add.run({sale_id: sale_id}),	
		
		//sale db event	
		await event_insert.run({
					event: 'db.insert', 
					event_from: 'appsmith sales frontend', 
					event_to: 'bj.sales', 
					actor: `${Select1.selectedOptionValue}`, 
					payload: `sale_id: ${sale_id}`
})
		]);
		
		
		
		for (const item of products) {
			
		//using Promise.all to run async together (since the queries dont depend on one another)
		Promise.all([
			
			
		// sale_item to DB
			await sale_items_insert.run({sale_id: sale_id, inventory_id: item.inventory_id, offered_price: offered_price}),
							
				//db event for sale_item
				await event_insert.run({
					event: 'db.insert', 
					event_from: 'appsmith sales frontend', 
					event_to: 'bj.sale_items', 
					actor: `${Select1.selectedOptionValue}`, 
					payload: `sale_id: ${sale_id}, inventory_id:${item.inventory_id}, code: ${item.code}`
				})
			
			
			
			
			
			
			])


		}
		//	use async-await or promises
		//	await storeValue('varName', 'hello world')
	}
}