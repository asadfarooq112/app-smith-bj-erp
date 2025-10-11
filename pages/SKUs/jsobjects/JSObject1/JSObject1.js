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
			Cost: ${newSku_cost.text},
			Supplier: ${Select1Copy1.selectedOptionValue}
			`;
				
			
				//db event
				await event_insert.run({
					event: 'db.insert', 
					event_from: 'appsmith frontend', 
					event_to: 'bj.sku', 
					actor: Select1.selectedOptionValue, 
					payload: payload_data
				});

				//biz event
				await event_insert.run({
					event: 'business.sku_insert', 
					event_from: 'appsmith frontend', 
					event_to: 'bj.sku', 
					actor: Select1.selectedOptionValue, 
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
	},
	
	async editSKU () {

		try {

			if (Input1.text == 381000) {

			await sku_update.run();

			const payload_data = `
			Code: ${Text2.text}, 
			Img: ${newSku_imgCopy.text}, 
			Retail: ${newSku_retailCopy.text},
			MinQty: ${newSku_minQtyCopy.text},
			DiamondQty: ${newSku_DqtyCopy.text},
			MetalType: ${newSku_metalTypeCopy.selectedOptionValue},
			Category: ${newSku_categoryCopy.selectedOptionValue},
			Cost: ${newSku_costCopy.text},
			Supplier: ${Select1Copy1Copy.selectedOptionValue}
			`;
				

				//db event
				await event_insert.run({
					event: 'db.update', 
					event_from: 'appsmith frontend', 
					event_to: 'bj.sku', 
					actor: Select1Copy.selectedOptionValue, 
					payload: payload_data
				});

				//biz event
				await event_insert.run({
					event: 'business.sku_update', 
					event_from: 'appsmith frontend', 
					event_to: 'bj.sku', 
					actor: Select1Copy.selectedOptionValue, 
					payload: payload_data
				});


				closeModal(sku_edit_modal.name);
				showAlert(`Updated: ${payload_data}`);
				console.log(payload_data);

				await sku.run();


			}
			else {
				showAlert('Wrong Password')
			}

		}

		catch(e) {
			console.log(e?.message);
			throw(e);
		}

	}

}