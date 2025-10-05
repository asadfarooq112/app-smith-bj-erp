export default {

		//1) create inventory_id uuid
		//2) add item in inventory
		//3) together < add refund in refund_exhange db, fin_tx, cash_tx and events all together >
		//4) make refund invoice

	
		async processReturn () {
		try {

			const inventoryuuid = crypto.randomUUID();
			const returnuuid = crypto.randomUUID();

			const payload_data = `Code: ${return_code_select.selectedOptionValue}, Size: ${return_size.text}, Metal Weight ${return_metal_weight.text}, Diamond Weight ${return_diamond_weight.text}`;
			
			//add to inventory (running first since the new inventory item must exist before inserting into the refund_exchange db
			await insert_new_return_item.run({inventoryuuid: inventoryuuid});
			
			
			await Promise.all([
			
				//add to refund_exchange db
			insert_refund_exchange.run({inventoryuuid: inventoryuuid, returnuuid: returnuuid }),

			//db event
			event_insert.run({
				event: 'db.insert', 
				event_from: 'appsmith frontend', 
				event_to: 'bj.return_exchange', 
				actor: `Employee ${Select_Employee.selectedOptionValue}`, 
				payload: payload_data
			}),

			//biz event
			event_insert.run({
				event: `business.${Select2.selectedOptionValue}`, 
				event_from: 'appsmith frontend', 
				event_to: 'bj.return_exchange', 
				actor: `Employee ${Select_Employee.selectedOptionValue}`, 
				payload: payload_data
			})
				
			]);
			
			if (Select2.selectedOptionValue == "Refund") {

			await financial_transaction_insert.run({type: 'refund', type_id: returnuuid, amount: Number(amount_refunded.text)*-1 });
				
			if (Select1.selectedOptionValue == "Cash") {
	
				await cash_tx_input.run({cash_tx_value: Number(amount_refunded.text)*-1, source: 'refund'})
				
			}
			

}
			

		}
		catch (e) {
			console.log(e?.message);
			throw(e);
		}
	}
}
	
