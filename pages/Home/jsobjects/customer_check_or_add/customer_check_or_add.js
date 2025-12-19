export default {

	async customerCheck () {

		if (!cust_name.text.trim() && !cust_phone.text.trim()) {
showAlert('Enter Customer Name or Phone');
			return;
		}
		
		if(cust_name.text) {
	
			const data = await search_cust_by_name.run({value: `${cust_name.text}%`});
			return data;
		}
			
		else {
		
			const data = await search_cust_by_phone.run({value: `${cust_phone.text}%`});
			return data;
			
		}
			
		
	}

	
	
}