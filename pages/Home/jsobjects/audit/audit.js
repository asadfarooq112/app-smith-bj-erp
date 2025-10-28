export default {

	initializeArrayAudit: () => {
		storeValue('auditInventory', []);
	},

	async myFun2 () {

		try{

		const auditInventoryData = await inventory_for_audit.run();
			
		await storeValue('auditInventory', auditInventoryData);
		
		await Api4.run();
		
		showAlert('Inventory Audit Sheet Emailed. Print, Fill and Upload here.', 'success')

		}

		catch(e) {
			showAlert('Audit not completed. Some Error!', 'error');
			throw(e);
		}

	}
}