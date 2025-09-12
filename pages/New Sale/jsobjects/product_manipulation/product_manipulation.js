export default {

	initializeArray: () => {
		storeValue('products', []);
	},

	saleUUID: () => {
	const saleuuid = crypto.randomUUID();
		storeValue('sale_uuid', saleuuid);
	},

	//////////////////////////////
	pushInArray () {


		let products = appsmith.store.products;

		let newProduct = {
			inventory_id: Table_inventory.triggeredRow.inventory_id,
			image: Table_inventory.triggeredRow.image,
			category: Table_inventory.triggeredRow.category,
			code: Table_inventory.triggeredRow.code,
			metal_type: Table_inventory.triggeredRow.metal_type,
			metal_weight: Table_inventory.triggeredRow.metal_weight,
			diamond_weight: Table_inventory.triggeredRow.diamond_weight,
			diamond_quantity: Table_inventory.triggeredRow.dia_qty,
			retail_price: Table_inventory.triggeredRow.retail_price,
			offered_price: Table_inventory.triggeredRow.retail_price
		};

		const exists = products.some(obj => obj.inventory_id === newProduct.inventory_id);

		if (exists) {
			showAlert('Cannot Add Duplicate Inventory Item');
		}

		else {

			let updateProducts = [...products, newProduct];

			storeValue("products", updateProducts);

			showAlert(`${Table_inventory.triggeredRow.code}, Size: ${Table_inventory.triggeredRow.size}, Weight: ${Table_inventory.triggeredRow.metal_weight} Added`);

			console.log(products);

		}
	},

	//////////////////////////////

	deleteFromArray () {

		let products = appsmith.store.products;

		const updatedProducts = products.filter( obj => obj.inventory_id !== List1.triggeredItem.inventory_id);

		storeValue("products", updatedProducts);

	},

	//////////////////////////////

	updateOfferedPrice () {

		let products = appsmith.store.products;

		// Try to use the syntax ->>>>  condition ? if return : else return   as much as you can its simple

		const updatedProducts = products.map(p =>
																				 p.inventory_id === List1.triggeredItem.inventory_id ? { ...p, offered_price: new_offered_price.text } : p
																				);


		storeValue("products", updatedProducts);
		console.log(updatedProducts);
		closeModal(modal_offered_price.name);
		new_offered_price.setValue("");

	},



	async myFun2 () {
		//	use async-await or promises
		//	await storeValue('varName', 'hello world')
	}
}