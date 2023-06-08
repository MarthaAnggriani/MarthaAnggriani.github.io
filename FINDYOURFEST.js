function enableSearchAndTicketButton() {
  $("#search-input").prop("disabled", false);
  $("button.tick-button").prop("disabled", false);
}

function disableSearchAndTicketButton() {
  $("#search-input").prop("disabled", true);
  $("button.tick-button").prop("disabled", true);
}

function myClick() {
  let nameUser = document.getElementById("nama").value;
  let age = document.getElementById("umur").value;

  if (nameUser === "" || age === "") {
    alert("Silakan isi data diri terlebih dahulu!");
    disableSearchAndTicketButton();
    return;
  }

  if (isNaN(age)) {
    alert(`Umur tidak valid`);
    disableSearchAndTicketButton();
  } else if (age >= 13) {
    alert(`Halo ${nameUser}! Kamu boleh melakukan pemesanan tiket`);
    enableSearchAndTicketButton();
  } else if (age < 13) {
    alert(`Halo ${nameUser}! Mohon maaf kamu tidak bisa membeli tiket karena kamu belum cukup umur :(. Silahkan didampingi orang tua yaaaa`);
    disableSearchAndTicketButton();
    location.reload();
  }
}

$(function() {
  var totalHarga = 0;

  $(document).ready(searchEvents);

  $("#search-input").on("input", searchEvents);

  function searchEvents() {
    var keyword = $("#search-input").val().toLowerCase();

    var events = [
      { date: '2023-06-23', title: 'SLANK: 25th Anniversary Tour', venue: 'Gambir Expo', image: 'https://slank.com/wp-content/uploads/2023/03/SLANK-POSTER-FEED-1.jpg', price: 2500000 },
      { date: '2023-06-24', title: 'SLANK: 25th Anniversary Tour', venue: 'Gambir Expo', image: 'https://slank.com/wp-content/uploads/2023/03/SLANK-POSTER-FEED-1.jpg', price: 2500000 },
      { date: '2023-06-24', title: 'AESPA SYNK: HYPER LINE', venue: 'ICE BSD', image: 'https://pbs.twimg.com/media/Fo5-DjlagAAlB9T?format=jpg', price: 3000000 },
      { date: '2023-07-07', title: 'HONNE Asia Tour 2023', venue: 'Beach City International Stadium', image: 'https://infopensi.com/wp-content/uploads/2015/honne-mengumumkan-tur-asia-2023-dan-jakarta-menjadi-bagian-dari-rangkaian-turnya.jpg', price: 3000000 },
      { date: '2023-07-30', title: 'WE THE FEST 2023', venue: 'GBK Sport Complex, Senayan', image: 'http://gbk.id/upload/event/1679379679-we%20the%20fest%202023%20banner.jpg', price: 1500000 },
      { date: '2023-07-30', title: 'RADWIMPS Asia Tour', venue: 'Basket Hall Senayan', image: 'https://img-highend.okezone.com/library/images/%5BID%5D%20RADWIMPS%20-%20KV%20Square.jpg', price: 3000000 },
      { date: '2023-08-09', title: 'TXT ACT: SWEET MIRAGE', venue: 'Beach City International Stadium', image:'https://img.celebrities.id/v438pF/master_S137lM3j8G_594_txt.jpg', price: 3000000 },
      { date: '2023-08-12', title: 'THE 90s FESTIVAL', venue: 'Gambir Expo', image: 'https://pbs.twimg.com/profile_images/1643483613781180416/Ts1-bCZ-_400x400.jpg', price: 1500000 },
      { date: '2023-09-22', title: 'PESTAPORA', venue: 'Gambir Expo', image: 'https://cdn2.tstatic.net/travel/foto/bank/images/poster-pestapora-2023.jpg', price: 1500000 },
      { date: '2023-09-23', title: 'PESTAPORA', venue: 'Gambir Expo', image: 'https://cdn2.tstatic.net/travel/foto/bank/images/poster-pestapora-2023.jpg', price: 1500000 },
      { date: '2023-09-29', title: 'ONE OK ROCK ASIA TOUR 2023', venue: 'Beach City International Stadium', image: 'https://awsimages.detik.net.id/community/media/visual/2023/06/02/poster-konser-one-ok-rock-di-jakarta.jpeg?w=1200', price: 3000000 },
      { date: '2023-11-15', title: 'COLDPLAY: Music of the Spheres', venue: 'Stadion Utama Gelora Bung Karno', image: 'https://whatsnewindonesia.com/sites/default/files/2023-05/Coldplay%20Jakarta.jpg', price: 4000000 }
    ];

    var eventInfo = "";
    
    for (var i = 0; i < events.length; i++) {
      if (keyword === "" || events[i].title.toLowerCase().includes(keyword)) {
        var eventDate = new Date(events[i].date);
        var formatDate = ("0" + eventDate.getDate()).slice(-2) + '.' + ("0" + (eventDate.getMonth() + 1)).slice(-2) + '.' + eventDate.getFullYear();

        eventInfo += '<div class="event-item">' +
          '<h2>' + events[i].title + '</h2>';
        if (formatDate) {
          eventInfo += '<p>' + formatDate + '</p>';
        }
        if (events[i].venue) {
          eventInfo += '<p>' + events[i].venue + '</p>';
        }
        if (events[i].image) {
          eventInfo += '<img src="' + events[i].image + '" alt="' + events[i].title + '">';
        }
        eventInfo += '<p class="price">' + formatPrice(events[i].price) + '</p>' +
          '<button class="tick-button">Buy Ticket</button>' +
          '<button class="remove-button">Remove</button>' +
          '</div>';
      }
    }

    if (eventInfo !== "") {
      $("#event-info").html(eventInfo);
    } else {
      $("#event-info").html("Hasil tidak ditemukan.");
    }

    function formatPrice(price) {
      var formatter = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0
      });
      return formatter.format(price);
    }

    $(".tick-button").on("click", function() {
      if ($("#nama").val() === "" || $("#umur").val() === "") {
        alert("Isi dulu data diri kamu okk");
        return;
      }      
      
      var eventIndex = $(this).closest(".event-item").index();
      var event = events[eventIndex];
      totalHarga += event.price;

      alert("Ditambahkan ke keranjang! Total Harga: " + formatPrice(totalHarga));
      $("#total-harga").text("Total Harga: " + formatPrice(totalHarga));
    });

    $(".remove-button").on("click", function() {
      if ($("#nama").val() === "" || $("#umur").val() === "") {
        alert("Isi dulu data diri kamu okk");
        return;
      }  
      var eventItem = $(this).closest(".event-item");
      var eventIndex = eventItem.index();
      var event = events[eventIndex];
      
      totalHarga -= event.price;
      if (totalHarga < 0) {
        totalHarga = 0;
      }
      alert("Dihapus dari keranjang! Total Harga: " + formatPrice(totalHarga));
      $("#total-harga").text("Total Harga: " + formatPrice(totalHarga));
    });
    
    

    var isPaymentCompleted = false;

    $("#lanjut-bayar-button").on("click", function() {
      if (totalHarga === 0) {
        alert("Beli tiketnya dulu dong....");
      } else if (!isPaymentCompleted) {
        alert("PEMBAYARAN BERHASIL!🎉🎉🎉 HAVE FUN MENIKMATI KONSER YAA 🥳🥳🥳");
        isPaymentCompleted = true;
        location.reload()
      }
    });

    $("#periksa-kembali-button").on("click", function () {
      var sectionTertuju = document.getElementById("section-tertuju");
      sectionTertuju.scrollIntoView({ behavior: "smooth" });
    });
  }
});