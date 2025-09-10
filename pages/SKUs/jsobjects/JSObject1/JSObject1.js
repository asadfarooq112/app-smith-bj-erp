export default {


	async insertInventory () {
		try {

			await sku_insert.run();
			
			const payload_data = `
			Code: ${newSku_code.text}, 
			Img: ${newSku_img.text}, 
			Retail: ${newSku_retail.text},
			MinQty: ${newSku_minQty.text},
			DiamondQty: ${newSku_Dqty.text},
			MetalType: ${newSku_metalType.selectedOptionValue},
			Category: ${newSku_category.selectedOptionValue},
			Cost: ${newSku_cost.text}
			`;
				
			
				//db event
				await event_insert.run({
					event: 'db.insert', 
					event_from: 'appsmith frontend', 
					event_to: 'bj.sku', 
					actor: 'employee', 
					payload: payload_data
				});

				//biz event
				await event_insert.run({
					event: 'business.sku_insert', 
					event_from: 'appsmith frontend', 
					event_to: 'bj.sku', 
					actor: 'employee', 
					payload: payload_data
				});
			
			
			

			closeModal(sku_add_modal.name);
			showAlert(`Inserted: ${payload_data}`);
			console.log(payload_data);

			await sku.run();

		}
		catch (e) {
			console.log(e?.message);
			throw(e);
		}
	}

}