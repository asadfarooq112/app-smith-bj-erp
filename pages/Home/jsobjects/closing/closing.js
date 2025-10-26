export default {
  initializeArrayCounting: () => {
    storeValue('counting', []);
  },

  async closingReport() {
    if (Input6.text !== '381000') {
      showAlert('Wrong Password', 'error');
      return;
    }

    try {
      // ✅ 1. Build countingData first
      const countingData = today_count.data.map(c => ({
        time: c.date_added,
        employee: c.employee_name,
        items_counted: c.count_data
      }));
      await storeValue("counting", countingData);

      // ✅ 2. Build payload object safely
      const payloadObj = {
        date: datetime.text,
        stockCounts: countingData,
        net_sales: net_sales.text,
        returns: returns.text,
        cash: cash.text,
        bank: bank.text,
        card: card.text,
        cod: cod.text,
        amount_due: due.text,
        cash_in_hand: dueCopy.text,
        calls: Input5.text,
        whatsapp: Input5Copy.text,
        insta: Input5Copy1.text,
        fb: Input5Copy2.text
      };

      // ✅ 3. Stringify once, after constructing full object
      const payload = JSON.stringify(payloadObj);

      // ✅ 4. Run async operations in parallel
      await Promise.all([
        inquiries_insert.run(),
        Api3.run(),
        event_insert.run({
          event: 'db.insert',
          event_from: 'appsmith sales frontend daily report',
          event_to: 'bj.num_of_inquiries',
          actor: Select_EmployeeCopy.selectedOptionValue,
          payload
        }),
        event_insert.run({
          event: 'business.closing_report_generated',
          event_from: 'appsmith sales frontend daily report',
          event_to: 'bj.num_of_inquiries',
          actor: Select_EmployeeCopy.selectedOptionValue,
          payload
        })
      ]);

      showAlert('Closing Report Generated');
      closeModal(Modal_closing.name);

    } catch (e) {
      console.error("Closing report error:", e);
      showAlert('Closing Report Generation Error!', 'error');
      throw e;
    }
  }
};
