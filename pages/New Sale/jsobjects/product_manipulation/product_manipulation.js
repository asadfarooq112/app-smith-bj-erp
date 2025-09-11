export default {
	
	initializeArray: () => {
    storeValue('products', []);
  },
	
	pushInArray () {
	
		
		let products = appsmith.store.products;
		
		let nextId = products.length > 0 ? products[products.length - 1].id + 1 : 1;

		let newProduct = {
			id: nextId,
			inventory_id: Table_inventory.triggeredRow.inventory_id,
			image: Table_inventory.triggeredRow.image,
			category: Table_inventory.triggeredRow.category,
			code: Table_inventory.triggeredRow.code,
			metal_type: Table_inventory.triggeredRow.metal_type,
			metal_weight: Table_inventory.triggeredRow.metal_weight,
			diamond_weight: Table_inventory.triggeredRow.diamond_weight,
			diamond_quantity: Table_inventory.triggeredRow.dia_qty,
			retail_price: Table_inventory.triggeredRow.retail_price
		};
		
		let updateProducts = [...products, newProduct];
		
		storeValue("products", updateProducts);

		showAlert(`${Table_inventory.triggeredRow.code}, Size: ${Table_inventory.triggeredRow.size}, Weight: ${Table_inventory.triggeredRow.metal_weight} Added`);
		
		console.log(products);
		
	},
	
	
	async myFun2 () {
		//	use async-await or promises
		//	await storeValue('varName', 'hello world')
	}
}