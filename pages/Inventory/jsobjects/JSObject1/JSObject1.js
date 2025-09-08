export default {

	async editInventory () {

		if (input_password.text == 381000) {
			
		await update_inventory.run();
		
			showAlert('Inventory Updated')
			await join_inventory_sku.run();
			
}
		else {
showAlert('Wrong Password')
		}
		
	}
}