export default {

	initializeArrayAudit: () => {
		storeValue('auditInventory', []);
	},

	async myFun2 () {

		try{

		const auditInventoryData = await inventory_for_audit.run();
			
		await storeValue('auditInventory', auditInventoryData);
		
		await Api4.run();
		
		showAlert('Inventory Audit Sheet Emailed. Print, Fill and Upload here.', 'success');
		resetWidget("Select_EmployeeCopy1");

		}

		catch(e) {
			showAlert('Error Submitting Audit!', 'error');
			
		const errorInfo = {
    name: e?.name || "UnknownError",
    message: e?.message || JSON.stringify(e),
    stack: e?.stack || "No stack trace"
  };
			
			const payloadString = JSON.stringify(errorInfo);
			
			event_insert.run({
			event: 'error', 
			event_from: 'appsmith frontend audit', 
			event_to: '-', 
			actor: Select_EmployeeCopy1.selectedOptionValue,
			payload: payloadString
			
		})
			
			throw(e);
		}

	}
}